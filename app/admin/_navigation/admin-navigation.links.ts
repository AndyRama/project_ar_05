import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { Home, MessageSquare, Users } from "lucide-react";

const ADMIN_PATH = `/admin`;

const ADMIN_LINKS: NavigationGroup[] = [
  {
    title: "Tableau de bord",
    links: [
      {
        href: ADMIN_PATH,
        Icon: Home,
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
        Icon: Users,
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
        href: `${ADMIN_PATH}/users`,
        Icon: Users,
        label: "Gestion des services",
      },
    ],
  },
] satisfies NavigationGroup[];

export const getAdminNavigation = (): NavigationGroup[] => {
  return ADMIN_LINKS;
};
