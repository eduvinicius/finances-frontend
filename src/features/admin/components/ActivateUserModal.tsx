import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useActivateUser } from "../hooks/useActivateUser";
import type { AdminUserListItem } from "@/shared/types/adminUser.types";

interface ActivateUserModalProps {
  user: AdminUserListItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivateUserModal({ user, isOpen, onClose }: Readonly<ActivateUserModalProps>) {
  const { mutate, isPending } = useActivateUser();

  const handleConfirm = () => {
    if (!user) return;
    mutate(user.id, { onSuccess: () => onClose() });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">Ativar usuário</DialogTitle>
          <DialogDescription className="text-white/70">
            Você está prestes a ativar <strong>{user?.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm rounded-md border px-4 py-3 bg-green-50 border-green-300 text-green-900 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200">
          O usuário voltará a ter acesso ao sistema.
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Ativando..." : "Ativar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
