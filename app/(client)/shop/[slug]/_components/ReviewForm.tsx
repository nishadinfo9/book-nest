"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ReviewForm() {
  return (
    <section className="mt-16 rounded-xl border p-8 w-2xl mx-auto">

      <h2 className="text-2xl font-bold">

        Write a Review

      </h2>

      <div className="mt-8 space-y-6">

        <div>

          <Label>
            Rating
          </Label>

          <Input
            type="number"
            min={1}
            max={5}
            placeholder="5"
          />

        </div>

        <div>

          <Label>
            Comment
          </Label>

          <Textarea
            rows={5}
            placeholder="Share your thoughts..."
          />

        </div>

        <div>

          <Label>
            Upload Image
          </Label>

          <Input
            type="file"
          />

        </div>

        <Button>

          Submit Review

        </Button>

      </div>

    </section>
  );
}