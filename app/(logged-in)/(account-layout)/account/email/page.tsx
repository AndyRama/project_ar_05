import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactSupportDialog } from "@/features/contact/support/contact-support-dialog";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { env } from "@/lib/env";
import { resend } from "@/lib/mail/resend";
import { combineWithParentMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { AccountLayout } from "../account-layout";
import { ToggleEmailCheckbox } from "./toggle-email-checkbox";

export const generateMetadata = combineWithParentMetadata({
  title: "Email",
  description: "Update your email notifications settings.",
});

export default async function MailProfilePage() {
  const user = await getRequiredUser();
  const userWithResendContactId = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      resendContactId: true,
    },
  });

  if (!userWithResendContactId?.resendContactId) {
    return (
      <AccountLayout>
        <div className="flex flex-col gap-4 lg:gap-8">
          <ErrorComponent />
        </div>
      </AccountLayout>
    );
  }

  if (!env.RESEND_AUDIENCE_ID) {
    return (
      <AccountLayout>
        <div className="flex flex-col gap-4 lg:gap-8">
          <ErrorComponent />
        </div>
      </AccountLayout>
    );
  }

  const { data: resendUser } = await resend.contacts.get({
    audienceId: env.RESEND_AUDIENCE_ID,
    id: userWithResendContactId.resendContactId,
  });

  if (!resendUser) {
    return (
      <AccountLayout>
        <div className="flex flex-col gap-4 lg:gap-8">
          <ErrorComponent />
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="flex flex-col gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Email paramètres</CardTitle>
            <CardDescription>
              Mets à jours tes notifications emails avec tes préferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleEmailCheckbox unsubscribed={resendUser.unsubscribed} />
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}

const ErrorComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resend non trouvé</CardTitle>
        <CardDescription>
          Nous n'avons pas pu trouver votre identifiant Resend. Merci de contacter le support.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <ContactSupportDialog />
      </CardFooter>
    </Card>
  );
};
