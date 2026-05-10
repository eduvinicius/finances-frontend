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
          <DialogTitle className="text-white">Desativar usuário</DialogTitle>
          <DialogDescription className="text-white/70">
            Você está prestes a desativar <strong>{user?.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm rounded-md border px-4 py-3 bg-yellow-50 border-yellow-300 text-yellow-900 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200">
          Isso impedirá o usuário de acessar o sistema. Esta ação pode ser desfeita.
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button variant="purple" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Desativando..." : "Desativar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
