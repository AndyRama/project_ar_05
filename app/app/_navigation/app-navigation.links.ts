import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { Home, Settings, Files, NotebookPen, ScreenShare  } from "lucide-react";

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
        Icon: Files,
        label: "Bilan mensuel",
      },
      {
        href: `${APP_PATH}/plan-alimentaire`,
        Icon: NotebookPen,
        label: "Plan alimentaire",
      },
    ],
  },
  {
    title: "Paramètre",
    links: [
      {
        href: `/account`,
        Icon: Settings,
        label: "Paramètre",
      },
    ],
  },
  {
    title: "Demo live",
    links: [
      {
        href: `${APP_PATH}/demo-live`,
        Icon: ScreenShare ,
        label: "Bilan mensuel v2",
      },
    ],
  },
] satisfies NavigationGroup[];
