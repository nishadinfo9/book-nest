import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function ReviewCard() {
  return (
    <div className="rounded-xl border p-5 w-2xl mx-auto">

      <div className="flex items-center gap-4">

        <Avatar>

          <AvatarFallback>
            N
          </AvatarFallback>

        </Avatar>

        <div>

          <h4 className="font-semibold">
            Nishad
          </h4>

          <div className="flex gap-1">

            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

          </div>

        </div>

      </div>

      <p className="mt-4 text-muted-foreground">

        Amazing book. Highly recommended for beginners.

      </p>

    </div>
  );
}