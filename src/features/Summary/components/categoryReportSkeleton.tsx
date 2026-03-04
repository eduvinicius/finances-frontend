import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

export function CategoryReportSkeleton() {
  const skeletonIds = ["cr-1", "cr-2", "cr-3", "cr-4", "cr-5"];

  return (
    <div className="flex flex-col gap-3">
      {skeletonIds.map((id) => (
        <Card key={id} className="py-4">
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 bg-(--purple-200)" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-10 bg-(--purple-200)" />
                <Skeleton className="h-4 w-24 bg-(--purple-200)" />
              </div>
            </div>
            <Skeleton className="h-1.5 w-full rounded-full bg-(--purple-200)" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
