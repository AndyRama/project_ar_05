import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { Home, MessageSquare, Users } from "lucide-react";

const ADMIN_PATH = `/admin`;

const ADMIN_LINKS: NavigationGroup[] = [
  {
    title: "Admin",
    links: [
      {
        href: ADMIN_PATH,
        Icon: Home,
        label: "Tableau de bord",
      },
      {
        href: `${ADMIN_PATH}/users`,
        Icon: Users,
        label: "Utilisateurs",
      },
      {
        href: `${ADMIN_PATH}/feedback`,
        Icon: MessageSquare,
        label: "Plan alimentaire",
      },
    ],
  },
  {
    title: "test",
    links: [
      {
        href: ADMIN_PATH,
        Icon: Home,
        label: "Planning publication",
      },
      {
        href: `${ADMIN_PATH}/users`,
        Icon: Users,
        label: "Gestion services",
      },
      {
        href: `${ADMIN_PATH}/feedback`,
        Icon: MessageSquare,
        label: "Parametre",
      },
    ],
  },
] satisfies NavigationGroup[];

export const getAdminNavigation = (): NavigationGroup[] => {
  return ADMIN_LINKS;
};
