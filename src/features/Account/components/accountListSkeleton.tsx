import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton/skeleton";

export function AccountsListSkeleton () {
    const skeletonCardIds = ['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4', 'skeleton-5'];
    
    return (
        <div className="grid grid-cols-5 gap-6 m-5">
            {skeletonCardIds.map((id) => (
                <Card key={id} className="overflow-hidden">
                    <CardHeader>
                        <Skeleton className="h-6 w-32 bg-(--purple-200)" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="w-full h-40 rounded-md bg-(--purple-200)" />
                        <Skeleton className="h-4 w-full bg-(--purple-200)" />
                        <Skeleton className="h-4 w-3/4 bg-(--purple-200)" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-12 bg-(--purple-200)" />
                            <Skeleton className="h-4 w-20 bg-(--purple-200)" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}