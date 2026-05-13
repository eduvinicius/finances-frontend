import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { changeRoleSchema, type ChangeRoleFormValues } from "@/shared/schemas/changeRoleSchema";

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
  const currentRoleString = user ? roleToString(user.role) : "";

  const { control, handleSubmit, watch, formState: { errors } } = useForm<ChangeRoleFormValues>({
    resolver: zodResolver(changeRoleSchema),
    defaultValues: { role: currentRoleString },
  });

  const { mutate, isPending } = useChangeUserRole();

  const selectedRole = watch("role");
  const isUnchanged = selectedRole === currentRoleString || selectedRole === "";

  const handleClose = () => {
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) handleClose();
  };

  const onSubmit = (values: ChangeRoleFormValues) => {
    if (!user || isUnchanged) return;
    mutate(
      { id: user.id, role: Number(values.role) },
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="change-role-select" className="text-white">Nova função</FieldLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
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
              )}
            />
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </Field>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUnchanged || isPending}
            >
              {isPending ? "Salvando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
