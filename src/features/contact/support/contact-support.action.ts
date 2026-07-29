"use server";

import { action } from "@/lib/actions/safe-actions";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/mail/send-email";
import { ContactSupportSchema } from "./contact-support.schema";
import { getUser } from "@/lib/auth/auth-user";

export const contactSupportAction = action
  .inputSchema(ContactSupportSchema)
  .action(async ({ parsedInput: { email, subject, message } }) => {
    const user = await getUser();
    const contactEmail = user?.email ?? email;

    if (!contactEmail) {
      throw new Error("Email requis");
    }

    await sendEmail({
      to: env.NEXT_PUBLIC_EMAIL_SUPPORT,
      subject: `Unl support | Besoin d'aide pour ${contactEmail} - ${subject}`,
      text: message,
      html: `<p>${message}</p>`,
      replyTo: contactEmail,
    });

    return { message: "Votre message a été envoyé au support." };
  });