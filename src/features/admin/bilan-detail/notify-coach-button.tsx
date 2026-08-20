"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, Check } from "lucide-react";
import { notifyCoachNewBilan } from "./notify-coach-action";
import { toast } from "sonner";

export function NotifyCoachButton({ profileId }: { profileId: string }) {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    startTransition(async () => {
      try {
        await notifyCoachNewBilan(profileId);
        setSent(true);
        toast.success("Le coach a été notifié");
      } catch {
        toast.error("Erreur lors de l'envoi de la notification");
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleClick}
      disabled={isPending || sent}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : sent ? (
        <Check className="size-4" />
      ) : (
        <Mail className="size-4" />
      )}
      {sent ? "Coach notifié" : "Demander un nouveau bilan"}
    </Button>
  );
}