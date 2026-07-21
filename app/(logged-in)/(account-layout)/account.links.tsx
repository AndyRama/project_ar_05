import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { AlertCircle, LayoutDashboard, Mail, User2 } from "lucide-react";

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
        href: "/account/cvg",
        Icon: LayoutDashboard,
        label: "Cgv",
      },
      {
        href: "/account/terms",
        Icon: LayoutDashboard,
        label: "Terms",
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
