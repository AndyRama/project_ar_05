import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { RATING_STARS, type RatingLevel } from "./fake-data";

export const Stars = ({ level }: { level: RatingLevel }) => {
  const count = RATING_STARS[level];
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-4", i < count ? "fill-orange-500 text-orange-500" : "text-muted-foreground/30")}
        />
      ))}
    </div>
  );
};