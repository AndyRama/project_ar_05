import { z } from "zod";

export const ContactSupportSchema = z.object({
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  subject: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(1, "Le message est requis"),
});

export type ContactSupportSchemaType = z.infer<typeof ContactSupportSchema>;