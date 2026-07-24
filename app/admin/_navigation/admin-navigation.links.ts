import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { LayoutDashboard, MessageSquare, NotebookPen , ScreenShare, Wrench , Users, Settings, BookOpen } from "lucide-react";

const ADMIN_PATH = `/admin`;

const ADMIN_LINKS: NavigationGroup[] = [
  {
    title: "Menu Principal", 
    links: [
      {
        href: ADMIN_PATH,
        Icon: LayoutDashboard,
        label: "Tableau de bord",
      },
      {
        href: `${ADMIN_PATH}/alimentaire/`,
        Icon: NotebookPen ,
        label: "Plan alimentaire",
      },
      {
        href: `${ADMIN_PATH}/users`,
        Icon: Users,
        label: "Utilisateurs",
      },
    ],
  },
  {
    title: "Marketing",
    links: [
      {
        href: `${ADMIN_PATH}/publication`,
        Icon: BookOpen,
        label: "Publication",
      },
      {
        href: `${ADMIN_PATH}/feedback`,
        Icon: MessageSquare,
        label: "Feedback",
      },
    ],
  },
  {
    title: "Paramètres",
    links: [
      {
        href: `${ADMIN_PATH}/services`,
        Icon:  Wrench ,
        label: "Gestion des services",
      },
      {
        href: `/account`,
        Icon: Settings,
        label: "Compte utilisateur",
      },
    ],
  },
  {
    title: "Démo live",
    links: [
        {
        href: `${ADMIN_PATH}/demo-live`,
        Icon: ScreenShare,
        label: "Nouveau formulaire",
      },
    ],
  },
] satisfies NavigationGroup[];

export const getAdminNavigation = (): NavigationGroup[] => {
  return ADMIN_LINKS;
};
