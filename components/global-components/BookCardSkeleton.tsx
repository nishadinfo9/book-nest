import { Skeleton } from "@/components/ui/skeleton";

export default function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-[180px] w-full rounded-md bg-amber-900/20" />
      <Skeleton className="w-full h-10 rounded-md bg-amber-900/20" />
      <div className="flex items-center gap-10">
        <Skeleton className="w-40 h-7  rounded-md bg-amber-900/20" />
        <Skeleton className=" w-full h-7 rounded-md bg-amber-900/20" />
      </div>
    </div>
  );
}