import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { Home, MessageSquare, Users, Settings, SlidersHorizontal, BookOpen } from "lucide-react";

const ADMIN_PATH = `/admin`;

const ADMIN_LINKS: NavigationGroup[] = [
  {
    title: "Menu Principal",
    links: [
      // {
      //   href: ADMIN_PATH,
      //   Icon: Home,
      //   label: "Tableau de bord",
      // },
      {
        href: `${ADMIN_PATH}/alimentaire`,
        Icon: Home,
        label: "Tableau de bord",
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
    title: "Application",
    links: [
      {
        href: `${ADMIN_PATH}/services`,
        Icon: Settings,
        label: "Gestion des services",
      },
      {
        href: `/account`,
        Icon: SlidersHorizontal,
        label: "Paramètre",
      },
    ],
  },
] satisfies NavigationGroup[];

export const getAdminNavigation = (): NavigationGroup[] => {
  return ADMIN_LINKS;
};
