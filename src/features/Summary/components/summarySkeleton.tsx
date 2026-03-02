import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

export function SummarySkeleton() {
  const skeletonIds = ["sk-1", "sk-2", "sk-3"];
  const skeletonRowIds = ["row-1", "row-2", "row-3", "row-4"];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {skeletonIds.map((id) => (
          <Card key={id}>
            <CardHeader>
              <Skeleton className="h-4 w-24 bg-(--purple-200)" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-36 bg-(--purple-200)" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {skeletonRowIds.map((id) => (
          <Skeleton key={id} className="h-14 w-full rounded-xl bg-(--purple-200)" />
        ))}
      </div>
    </div>
  );
}
