import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAdminUserDetail } from "../hooks/useAdminUserDetail";

interface UserDetailModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function DetailRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return format(new Date(dateStr), "dd/MM/yyyy");
  } catch {
    return "—";
  }
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return "Never";
  try {
    return format(new Date(dateStr), "dd/MM/yyyy HH:mm");
  } catch {
    return "Never";
  }
}

export function UserDetailModal({ userId, isOpen, onClose }: Readonly<UserDetailModalProps>) {
  const { data: user, isLoading } = useAdminUserDetail(userId);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Read-only view of the selected user's information.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        ) : user ? (
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Full Name" value={user.fullName} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Nickname" value={user.nickname ?? "—"} />
            <DetailRow label="Role" value={user.role} />
            <DetailRow label="Status" value={user.isActive ? "Active" : "Inactive"} />
            <DetailRow label="Created At" value={formatDateTime(user.createdAt)} />
            <DetailRow label="Last Login" value={formatDateTime(user.lastLogin)} />
            <DetailRow label="Document Number" value={user.documentNumber ?? "—"} />
            <DetailRow label="Birth Date" value={formatDate(user.birthDate)} />
            <DetailRow label="Address" value={user.address ?? "—"} />
            <DetailRow label="City" value={user.city ?? "—"} />
            <DetailRow label="Postal Code" value={user.postalCode ?? "—"} />
            <DetailRow label="Country" value={user.country ?? "—"} />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
