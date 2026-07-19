import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, magicLink } from "better-auth/plugins";

import { sendEmail } from "@/lib/mail/send-email";
import { SiteConfig } from "@/site-config";
import MarkdownEmail from "@email/markdown.email";
import { setupResendCustomer } from "./auth/auth-config-setup";
import { createInitialAlimentaireProfile } from "./auth/audit-profile-setup";
import { env } from "./env";
import { logger } from "./logger";
import { prisma } from "./prisma";
import { getServerUrl } from "./server-url";
import { stripe } from "./stripe";

type SocialProvidersType = Parameters<typeof betterAuth>[0]["socialProviders"];

export const SocialProviders: SocialProvidersType = {};

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  SocialProviders.github = {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  };
}

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  SocialProviders.google = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: getServerUrl(),
    trustedOrigins: [
    "http://f8cs888kokw84o4w0wc48044.148.230.125.176.sslip.io",
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user, _req) => {
          await setupResendCustomer(user);
          await createInitialAlimentaireProfile(user);

          // Création du client Stripe
          try {
            const stripeCustomer = await stripe.customers.create({
              email: user.email,
              name: user.name,
              metadata: {
                userId: user.id,
              },
            });

            // Mise à jour de l'utilisateur avec l'ID client Stripe
            await prisma.user.update({
              where: { id: user.id },
              data: { stripeCustomerId: stripeCustomer.id },
            });
          } catch (err) {
            logger.error("Échec de la création du client Stripe", { err });
          }
        },
      },
    },
  },
  advanced: {
    cookiePrefix: SiteConfig.appId,
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        html: MarkdownEmail({
          preview: `Réinitialisez votre mot de passe pour ${SiteConfig.title}`,
          markdown: `
          Bonjour,

          Vous avez demandé la réinitialisation de votre mot de passe.

          [Cliquez ici pour réinitialiser votre mot de passe](${url})

          Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
          `,
        }),
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        await sendEmail({
          to: newEmail,
          subject: "Modification de votre adresse email",
          html: MarkdownEmail({
            preview: `Changez votre adresse email pour ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Vous avez demandé la modification de votre adresse email.

            [Cliquez ici pour vérifier votre nouvelle adresse email](${url})

            Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
            `,
          }),
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, token }) => {
        const url = `${getServerUrl()}/auth/confirm-delete?token=${token}&callbackUrl=/auth/goodbye`;
        await sendEmail({
          to: user.email,
          subject: "Suppression de votre compte",
          html: MarkdownEmail({
            preview: `Supprimez votre compte ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Vous avez demandé la suppression de votre compte.

            [Cliquez ici pour confirmer la suppression de votre compte](${url})

            Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
            `,
          }),
        });
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Vérification de votre adresse email",
        html: MarkdownEmail({
          preview: `Vérifiez votre email pour ${SiteConfig.title}`,
          markdown: `
          Bonjour,

          Bienvenue sur ${SiteConfig.title} ! Merci de vérifier votre adresse email.

          [Cliquez ici pour vérifier votre email](${url})

          Si vous n'avez pas créé de compte, ignorez cet email.
          `,
        }),
      });
    },
  },
  socialProviders: SocialProviders,
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "Votre lien de connexion",
          html: MarkdownEmail({
            preview: `Lien magique pour vous connecter à ${SiteConfig.title}`,
            markdown: `
            Bonjour,

            Vous avez demandé un lien de connexion rapide à votre compte.

            [Cliquez ici pour vous connecter](${url})

            Ce lien est à usage unique. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
            `,
          }),
        });
      },
    }),
    admin({}),
    // Warning: always last plugin
    nextCookies(),
  ],
});