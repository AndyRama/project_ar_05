import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { AlertCircle, LayoutDashboard, Mail, User2, File, Files } from "lucide-react";

export const getAccountNavigation = (): NavigationGroup[] => {
  return ACCOUNT_LINKS;
};

const ACCOUNT_LINKS: NavigationGroup[] = [
  {
    title: "Ton profil",
    links: [
      {
        href: "/account",
        Icon: User2,
        label: "Profile",
      },
      {
        href: "/account/email",
        Icon: Mail,
        label: "Mail",
      },
      {
        href: "/account/danger",
        Icon: AlertCircle,
        label: "Danger",
      },
    ],
  },
  {
    title: "Mention légal",
    links: [
      {
        href: "/legal/cvg",
        Icon: File,
        label: "Cgv",
      },
      {
        href: "/legal/privacy",
        Icon: Files,
        label: "Mentions Légales",
      },
    ],
  },
  {
    title: "App",
    links: [
      {
        href: "/app",
        Icon: LayoutDashboard,
        label: "Mon Tableau de bord",
      },
    ],
  },
];
