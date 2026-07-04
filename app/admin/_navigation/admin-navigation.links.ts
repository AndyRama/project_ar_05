import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { MessageSquare, Users, Settings, TextSelect, SlidersHorizontal, BookOpen } from "lucide-react";

const ADMIN_PATH = `/admin`;

const ADMIN_LINKS: NavigationGroup[] = [
  {
    title: "Tableau de bord",
    links: [
      {
        href: ADMIN_PATH,
        Icon: TextSelect,
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
        href: `${ADMIN_PATH}/users`,
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
        href: `/account`,
        Icon: SlidersHorizontal,
        label: "Paramètres",
      },
      {
        href: `${ADMIN_PATH}/services`,
        Icon: Settings,
        label: "Gestion des services",
      },
    ],
  },
] satisfies NavigationGroup[];

export const getAdminNavigation = (): NavigationGroup[] => {
  return ADMIN_LINKS;
};
