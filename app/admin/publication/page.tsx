import { getPosts } from "@/features/posts/post-manager";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  LayoutActions,
} from "@/features/page/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Eye, PenLine, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import type { PageParams } from "@/types/next";

// ── Planning 52 semaines Unlcoaching ─────────────────────────────

const PLANNING = [
  { semaine: "S1",  publie: true, theme: "Résolutions",          titre: "Pourquoi 90% des régimes échouent et comment réussir votre transformation en 2026.",              intention: "Éducationnel" },
  { semaine: "S2",  publie: true, theme: "Local / Bordeaux",     titre: "Top 5 des meilleurs parcs pour s'entraîner en extérieur à Bordeaux cet hiver.",                   intention: "Local" },
  { semaine: "S3",  publie: true, theme: "Nutrition / TCA",      titre: "Comprendre les TCA : Comment manger sans culpabiliser tout en perdant du gras.",                   intention: "Expertise" },
  { semaine: "S4",  publie: true, theme: "Entraînement",         titre: "Débuter en salle de sport : Le guide complet pour ne plus avoir peur du regard des autres.",       intention: "Guide" },
  { semaine: "S5",  publie: true, theme: "Sommeil",              titre: "Sommeil et Performance : Pourquoi dormir plus vous fera perdre plus de poids.",                    intention: "Santé" },
  { semaine: "S6",  publie: true, theme: "Success Story",        titre: "Témoignage : Comment Marie a perdu 12kg en 4 mois avec Unlcoaching.",                              intention: "Preuve Sociale" },
  { semaine: "S7",  publie: true, theme: "Mental",               titre: "Discipline vs Motivation : Le secret pour tenir votre programme sur le long terme.",               intention: "Mental" },
  { semaine: "S8",  publie: true, theme: "Nutrition",            titre: "Faut-il supprimer les glucides pour perdre du poids ? On démystifie le vrai du faux.",             intention: "Info / Vente" },
  { semaine: "S9",  publie: true, theme: "Local (Mérignac)",     titre: "Coach sportif à Mérignac : Pourquoi l'accompagnement personnalisé change tout.",                   intention: "Local" },
  { semaine: "S10", publie: false, theme: "Spécificité",          titre: "Coaching en ligne vs Coaching présentiel à Bordeaux : Quel format choisir ?",                     intention: "Comparatif" },
  { semaine: "S11", publie: false, theme: "TCA",                  titre: "Hyperphagie et sport : Comment sortir du cycle des crises grâce au coaching.",                     intention: "Expertise" },
  { semaine: "S12", publie: false, theme: "Lifestyle",            titre: "Concilier vie professionnelle à Bordeaux et sport : 3 astuces pour les cadres pressés.",           intention: "Segmenté" },
  { semaine: "S13", publie: false, theme: "Récap T1",             titre: "Bilan 3 mois : Les erreurs classiques qui bloquent votre progression au printemps.",               intention: "Récapitulatif" },
  { semaine: "S14", publie: false, theme: "Prise de Masse",       titre: "Comment construire un physique athlétique : Les bases de la prise de masse intelligente.",         intention: "Guide" },
  { semaine: "S15", publie: false, theme: "Local (Pessac)",       titre: "Trouver un coach sportif à Pessac : Les critères pour ne pas se tromper.",                        intention: "Local" },
  { semaine: "S16", publie: false, theme: "Nutrition",            titre: "Les compléments alimentaires sont-ils indispensables pour se muscler ?",                           intention: "Info / Vente" },
  { semaine: "S17", publie: false, theme: "Programme",            titre: "Full Body ou Split ? Quelle programmation choisir pour maximiser vos résultats.",                  intention: "Technique" },
  { semaine: "S18", publie: false, theme: "Remise en forme",      titre: "Objectif Été : Est-il trop tard pour commencer sa transformation en mai ?",                        intention: "Saisonnier" },
  { semaine: "S19", publie: false, theme: "Mental",               titre: "Pourquoi le stress empêche votre prise de muscle (et comment le gérer).",                          intention: "Mental" },
  { semaine: "S20", publie: false, theme: "Local (Arcachon)",     titre: "Préparer son corps pour la plage : Coaching intensif sur le Bassin d'Arcachon.",                   intention: "Local" },
  { semaine: "S21", publie: false, theme: "Lifestyle",            titre: "Alcool et Fitness : Comment profiter des terrasses bordelaises sans ruiner vos efforts.",          intention: "Lifestyle" },
  { semaine: "S22", publie: false, theme: "Success Story",        titre: "Transformation Express : Comment Thomas s'est préparé pour son mariage en 12 semaines.",           intention: "Preuve Sociale" },
  { semaine: "S23", publie: false, theme: "Matériel",             titre: "Faut-il investir dans une montre connectée pour suivre sa progression ?",                          intention: "Info / Produit" },
  { semaine: "S24", publie: false, theme: "Spécificité",          titre: "Musculation au féminin : Pourquoi vous ne deviendrez pas \"trop musclée\".",                       intention: "Segmenté" },
  { semaine: "S25", publie: false, theme: "Nutrition",            titre: "L'importance des protéines : Sources végétales vs animales pour le sportif.",                      intention: "Éducationnel" },
  { semaine: "S26", publie: false, theme: "Récap T2",             titre: "Routine d'été : Maintenir ses acquis pendant les vacances sans frustration.",                      intention: "Récapitulatif" },
  { semaine: "S27", publie: false, theme: "Compétition",          titre: "Préparation au concours Fitness : Les secrets d'une \"sèche\" réussie.",                           intention: "Expertise" },
  { semaine: "S28", publie: false, theme: "Local (Chartrons)",    titre: "Coaching personnalisé aux Chartrons : Le sport au cœur de Bordeaux.",                              intention: "Local" },
  { semaine: "S29", publie: false, theme: "Mental",               titre: "Visualisation et Performance : La technique des champions pour atteindre leurs objectifs.",        intention: "Mental" },
  { semaine: "S30", publie: false, theme: "Lifestyle",            titre: "Sport et Parentalité : Comment rester en forme quand on a des enfants en bas âge.",               intention: "Segmenté" },
  { semaine: "S31", publie: false, theme: "Nutrition",            titre: "Le jeûne intermittent : Est-ce vraiment efficace pour la performance sportive ?",                  intention: "Comparatif" },
  { semaine: "S32", publie: false, theme: "Entraînement",         titre: "L'importance de la mobilité : Pourquoi s'étirer vous rendra plus fort.",                          intention: "Technique" },
  { semaine: "S33", publie: false, theme: "Rentrée",              titre: "Rentrée 2026 : Pourquoi septembre est le meilleur moment pour prendre un coach.",                  intention: "Saisonnier" },
  { semaine: "S34", publie: false, theme: "Local (Bouscat)",      titre: "Améliorer sa condition physique au Bouscat avec un coach certifié.",                               intention: "Local" },
  { semaine: "S35", publie: false, theme: "TCA",                  titre: "Guérir de la boulimie par le sport : Le rôle crucial de l'activité physique encadrée.",           intention: "Expertise" },
  { semaine: "S36", publie: false, theme: "Nutrition",            titre: "Préparation des repas (Meal Prep) : Gagnez 5h par semaine avec ces astuces.",                     intention: "Guide" },
  { semaine: "S37", publie: false, theme: "Mental",               titre: "Sortir de sa zone de confort : Pourquoi la difficulté est votre meilleure alliée.",               intention: "Mental" },
  { semaine: "S38", publie: false, theme: "Success Story",        titre: "De sédentaire à athlète : Le parcours inspirant d'Alexandre, 42 ans.",                            intention: "Preuve Sociale" },
  { semaine: "S39", publie: false, theme: "Récap T3",             titre: "Faire le point sur ses objectifs de rentrée : Ajuster sa stratégie pour l'hiver.",                intention: "Récapitulatif" },
  { semaine: "S40", publie: false, theme: "Santé",                titre: "Renforcer son système immunitaire par le sport avant l'hiver bordelais.",                          intention: "Santé" },
  { semaine: "S41", publie: false, theme: "Local (Talence)",      titre: "Coaching sportif étudiant à Talence : Performance académique et physique.",                        intention: "Local" },
  { semaine: "S42", publie: false, theme: "Nutrition",            titre: "Hydratation et sport en hiver : L'erreur que tout le monde fait.",                                 intention: "Éducationnel" },
  { semaine: "S43", publie: false, theme: "Mental",               titre: "La déprime saisonnière : Comment le sport booste votre sérotonine.",                               intention: "Mental" },
  { semaine: "S44", publie: false, theme: "Lifestyle",            titre: "Fitness et Télétravail : 5 exercices à faire au bureau pour sauver votre dos.",                   intention: "Segmenté" },
  { semaine: "S45", publie: false, theme: "Expertise",            titre: "L'importance du bilan biométrique : Pourquoi nous mesurons tout chez Unlcoaching.",               intention: "Confiance" },
  { semaine: "S46", publie: false, theme: "Local (Gradignan)",    titre: "Programme de musculation sur mesure à Gradignan : Résultats garantis.",                           intention: "Local" },
  { semaine: "S47", publie: false, theme: "Nutrition",            titre: "Fêtes de fin d'année : Le guide pour profiter sans ruiner 1 an de travail.",                     intention: "Saisonnier" },
  { semaine: "S48", publie: false, theme: "Marque",               titre: "Pourquoi choisir Unlcoaching ? Nos valeurs et notre méthode 7j/7.",                               intention: "Marque" },
  { semaine: "S49", publie: false, theme: "FAQ",                  titre: "Questions Fréquentes : Tout ce que vous n'osez pas demander à votre coach.",                      intention: "FAQ" },
  { semaine: "S50", publie: false, theme: "Success Story",        titre: "Rétrospective 2026 : Les transformations les plus marquantes de la Team.",                         intention: "Preuve Sociale" },
  { semaine: "S51", publie: false, theme: "Vision",               titre: "Préparer 2027 : Pourquoi l'anticipation est la clé du succès physique.",                          intention: "Inspiration" },
  { semaine: "S52", publie: false, theme: "Offre",                titre: "Offre VIP Janvier : Réservez votre transformation dès maintenant (Places limitées).",             intention: "Conversion" },
];

export default async function PublicationsAdminPage(
  props: PageParams<{ orgSlug: string }>
) {
  const params = await props.params;
  const posts = await getPosts();

  const publishedCount = PLANNING.filter((p) => p.publie).length;
  const totalCount = PLANNING.length;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Planning des publications</LayoutTitle>
      </LayoutHeader>

      <LayoutActions className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {publishedCount} publiés
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <Circle className="h-3.5 w-3.5" />
          {totalCount - publishedCount} à venir
        </span>
        <div className="ml-2 flex items-center gap-2">
          <div className="h-1.5 w-32 rounded-full bg-muted">
            <div
              className="h-1.5 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${(publishedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {Math.round((publishedCount / totalCount) * 100)}%
          </span>
        </div>
      </LayoutActions>

      <LayoutContent>
        <div className="overflow-hidden rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">Sem.</TableHead>
                <TableHead className="w-20">Statut</TableHead>
                <TableHead className="w-36">Thème</TableHead>
                <TableHead>Titre de l'article</TableHead>
                <TableHead className="w-36">Intention SEO</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PLANNING.map((article) => {
                const matchedPost = posts.find((p) =>
                  p.attributes.title
                    .toLowerCase()
                    .includes(article.titre.toLowerCase().slice(0, 20))
                );

                return (
                  <TableRow
                    key={article.semaine}
                    className={
                      article.publie
                        ? "bg-emerald-50/30 hover:bg-emerald-50/50"
                        : "hover:bg-muted/30"
                    }
                  >
                    <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                      {article.semaine}
                    </TableCell>

                    <TableCell>
                      {article.publie ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Publié
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          <Circle className="h-3 w-3" />
                          Planifié
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-xs font-normal">
                        {article.theme}
                      </Badge>
                    </TableCell>

                    <TableCell className="max-w-[400px]">
                      <p className="line-clamp-2 text-sm font-medium leading-snug">
                        {article.titre}
                      </p>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {article.intention}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {matchedPost ? (
                          <>
                            <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                              <Link href={`/orgs/${params.orgSlug}/publications/${matchedPost.slug}`}>
                                <Eye className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                              <Link href={`/posts/${matchedPost.slug}`} target="_blank">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground">
                            <Link
                              href={`/orgs/${params.orgSlug}/publications/new?semaine=${article.semaine}&titre=${encodeURIComponent(article.titre)}`}
                            >
                              <PenLine className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </LayoutContent>
    </Layout>
  );
}