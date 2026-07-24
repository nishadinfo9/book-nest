import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ReviewType } from '@/types/review.type';
import { Star } from 'lucide-react';

export default function ReviewCard({ item }: { item: ReviewType }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border bg-background p-5 shadow-sm">
      {/* User */}
      <div className="flex items-center gap-4">
        <Avatar className="h-11 w-11">
          <AvatarImage src={item.avatar} alt={item.user ?? 'User'} />
          <AvatarFallback>
            {item.user?.charAt(0).toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h4 className="font-semibold">
            {item.user ?? 'Anonymous'}
          </h4>

          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={15}
                className={
                  i < Number(item.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-transparent text-muted-foreground'
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="mt-4 space-y-3">
  {/* Review Text */}
  <p className="text-[15px] leading-7 text-foreground">
    {item.comment}
  </p>

  {/* Shared Images */}
  {item.image && (
    <div className="flex flex-wrap gap-3">
      <div className="relative h-28 w-24 overflow-hidden rounded-lg border bg-muted">
        <Image
          src={item.image}
          alt="Book"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>


    </div>
  )}
</div>
    </div>
  );
}