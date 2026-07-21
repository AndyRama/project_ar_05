import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { Home, User } from "lucide-react";

const APP_PATH = "/app";

export const APP_LINKS: NavigationGroup[] = [
  {
    title: "Menu",
    links: [
      {
        href: APP_PATH,
        Icon: Home,
        label: "Dashboard",
      },
      {
        href: `${APP_PATH}/bilan`,
        Icon: User,
        label: "Bilan mensuel",
      },
      {
        href: `${APP_PATH}/plan-alimentaire`,
        Icon: User,
        label: "Plan alimentaire PDF",
      },
    ],
  },
  {
    title: "Paramètre",
    links: [
      {
        href: `/account`,
        Icon: Home,
        label: "Paramètre",
      },
    ],
  },
] satisfies NavigationGroup[];
