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
import { Field, FieldLabel } from "@/components/ui/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/InputSelect";
import { useChangeUserRole } from "../hooks/useChangeUserRole";
import type { AdminUserListItem } from "@/shared/types/adminUser.types";

interface ChangeRoleModalProps {
  user: AdminUserListItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS = [
  { label: "Admin", value: "1" },
  { label: "Usuário", value: "0" },
];

function roleToString(role: 'Admin' | 'User'): string {
  return role === 'Admin' ? '1' : '0';
}

/**
 * ChangeRoleModal is unmounted when isOpen=false (controlled by the parent),
 * so internal state resets automatically each open/close cycle.
 * The parent passes user=null when closed, so we gate rendering on user being present.
 */
export function ChangeRoleModal({ user, isOpen, onClose }: Readonly<ChangeRoleModalProps>) {
  // Initialise from user.role — safe because this component is remounted each open cycle
  const [selectedRole, setSelectedRole] = useState<string>(
    user ? roleToString(user.role) : ""
  );
  const { mutate, isPending } = useChangeUserRole();

  const currentRoleString = user ? roleToString(user.role) : "";
  const isUnchanged = selectedRole === currentRoleString || selectedRole === "";

  const handleClose = () => {
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) handleClose();
  };

  const handleConfirm = () => {
    if (!user || isUnchanged) return;
    mutate(
      { id: user.id, role: Number(selectedRole) },
      { onSuccess: handleClose }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">Alterar função do usuário</DialogTitle>
          <DialogDescription className="text-white/70">
            Alterar a função de <strong>{user?.fullName}</strong>.
            Função atual: <strong>{user?.role}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="change-role-select" className="text-white">Nova função</FieldLabel>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger id="change-role-select">
              <SelectValue placeholder="Selecione uma função" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isUnchanged || isPending}
          >
            {isPending ? "Salvando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
