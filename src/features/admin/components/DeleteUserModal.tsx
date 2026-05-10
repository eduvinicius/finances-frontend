import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field, FieldLabel } from "@/components/ui/Field";
import { useDeleteUser } from "../hooks/useDeleteUser";
import type { AdminUserListItem } from "@/shared/types/adminUser.types";

interface DeleteUserModalProps {
  user: AdminUserListItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteUserModal({ user, isOpen, onClose }: Readonly<DeleteUserModalProps>) {
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const { mutate, isPending } = useDeleteUser();

  const isConfirmed = emailConfirmation === user?.email;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEmailConfirmation("");
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!user || !isConfirmed) return;
    mutate(user.id, {
      onSuccess: () => {
        setEmailConfirmation("");
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">Excluir usuário</DialogTitle>
          <DialogDescription className="text-white/70">
            Você está prestes a excluir permanentemente <strong>{user?.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm rounded-md border px-4 py-3 bg-red-50 border-red-300 text-red-900 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200">
          Isso excluirá permanentemente o usuário e todos os seus dados. Esta ação não pode ser desfeita.
        </p>

        <Field>
          <FieldLabel htmlFor="delete-email-confirm" className="text-white">
            Digite o e-mail do usuário para confirmar
          </FieldLabel>
          <Input
            id="delete-email-confirm"
            type="email"
            placeholder={user?.email ?? ""}
            value={emailConfirmation}
            onChange={(e) => setEmailConfirmation(e.target.value)}
            disabled={isPending}
            aria-label="Confirme o e-mail do usuário para habilitar a exclusão"
          />
        </Field>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="secondary"
            onClick={handleConfirm}
            disabled={!isConfirmed || isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? "Excluindo..." : "Excluir permanentemente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>   
  );
}
