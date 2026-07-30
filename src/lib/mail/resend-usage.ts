"use server";

const RESEND_API_URL = "https://api.resend.com/emails";
const MONTHLY_EMAIL_LIMIT = 3000;

type ResendEmail = {
  id: string;
  message_id: string;
  to: string[];
  from: string;
  created_at: string; // e.g. "2026-04-03 22:13:42.674981+00"
  subject: string;
  last_event: string;
  scheduled_at: string | null;
};

type ResendListResponse = {
  object: "list";
  has_more: boolean;
  data: ResendEmail[];
};

// Resend renvoie des dates du type "2026-04-03 22:13:42.674981+00".
// new Date() sur ce format brut renvoie Invalid Date car:
//  - il manque le "T" entre date et heure
//  - le fuseau horaire "+00" n'a pas de ":00" (format ISO strict requis)
//  - les microsecondes (6 chiffres) ne sont pas supportées (JS gère jusqu'à 3)
function parseResendDate(raw: string): Date {
  let iso = raw.trim().replace(" ", "T");
  iso = iso.replace(/(\.\d{3})\d+/, "$1"); // tronque à 3 décimales (ms)
  iso = iso.replace(/([+-]\d{2})$/, "$1:00"); // +00 -> +00:00
  return new Date(iso);
}

export async function getResendUsage() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY manquante dans les variables d'environnement");
  }

  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  let sentThisMonth = 0;
  let after: string | undefined = undefined;
  let reachedPreviousMonth = false;

  // La liste Resend est triée du plus récent au plus ancien.
  // On pagine jusqu'à sortir du mois en cours, ce qui évite de tout parcourir.
  while (!reachedPreviousMonth) {
    const url = new URL(RESEND_API_URL);
    url.searchParams.set("limit", "100");
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur Resend API: ${res.status} ${res.statusText}`);
    }

    const json = (await res.json()) as ResendListResponse;

    for (const email of json.data) {
      const createdAt = parseResendDate(email.created_at);
      if (Number.isNaN(createdAt.getTime())) {
        console.warn(
          `[getResendUsage] Date illisible depuis Resend: "${email.created_at}", email ignoré`,
        );
        continue;
      }
      if (createdAt >= startOfMonth) {
        sentThisMonth += 1;
      } else {
        reachedPreviousMonth = true;
        break;
      }
    }

    if (!json.has_more || json.data.length === 0) break;
    after = json.data[json.data.length - 1].id;
  }

  const remaining = Math.max(0, MONTHLY_EMAIL_LIMIT - sentThisMonth);
  const percentUsed = Math.min(100, (sentThisMonth / MONTHLY_EMAIL_LIMIT) * 100);

  // Date de reset = 1er du mois suivant
  const resetDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

  return {
    sentThisMonth,
    limit: MONTHLY_EMAIL_LIMIT,
    remaining,
    percentUsed,
    resetDate: resetDate.toISOString(),
  };
}