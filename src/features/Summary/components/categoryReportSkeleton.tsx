import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

export function CategoryReportSkeleton() {
  const legendIds = ["l-1", "l-2", "l-3", "l-4"];

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <div className="relative flex items-center justify-center">
          <Skeleton className="h-56 w-56 rounded-full bg-(--purple-200)" />
          <div className="absolute h-28 w-28 rounded-full bg-card" />
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {legendIds.map((id) => (
            <div key={id} className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full bg-(--purple-200)" />
              <Skeleton className="h-3 w-32 bg-(--purple-200)" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
