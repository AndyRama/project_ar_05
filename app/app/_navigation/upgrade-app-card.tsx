import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BILLING_URL } from "@/lib/LINKS";
import Link from "next/link";
import { useCurrentUser } from "./use-current-user";

export const UpgradeCard = () => {
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <Card className="">
      <CardHeader className="">
        <CardTitle>Programmes</CardTitle>
        <CardDescription>
          Renouveller votre programme Premium et Competition avec le code pro UNLBOOSTER
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Link
          href={BILLING_URL}
          className={buttonVariants({ className: "w-full" })}
        >
          Renouveller
        </Link>
      </CardContent>
    </Card>
  );
};
