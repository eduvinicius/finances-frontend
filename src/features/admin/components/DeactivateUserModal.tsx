import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useDeactivateUser } from "../hooks/useDeactivateUser";
import type { AdminUserListItem } from "@/shared/types/adminUser.types";

interface DeactivateUserModalProps {
  user: AdminUserListItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeactivateUserModal({ user, isOpen, onClose }: Readonly<DeactivateUserModalProps>) {
  const { mutate, isPending } = useDeactivateUser();

  const handleConfirm = () => {
    if (!user) return;
    mutate(user.id, { onSuccess: () => onClose() });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deactivate User</DialogTitle>
          <DialogDescription>
            You are about to deactivate <strong>{user?.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3">
          This will prevent the user from logging in. This can be undone.
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="purple"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "Deactivating..." : "Deactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
