import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

function CardSkeleton({ bodyHeight = "h-20" }: Readonly<{ bodyHeight?: string }>) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className={`w-full ${bodyHeight}`} />
      </CardContent>
    </Card>
  );
}

export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Balance card */}
      <CardSkeleton bodyHeight="h-16" />
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardSkeleton bodyHeight="h-36" />
        <CardSkeleton bodyHeight="h-36" />
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardSkeleton bodyHeight="h-48" />
        <CardSkeleton bodyHeight="h-48" />
      </div>
    </div>
  );
}
