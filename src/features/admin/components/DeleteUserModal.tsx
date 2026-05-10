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
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            You are about to permanently delete <strong>{user?.fullName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground rounded-md border border-red-300 bg-red-50 px-4 py-3">
          This will permanently delete the user and all their data. This action cannot be undone.
        </p>

        <Field>
          <FieldLabel htmlFor="delete-email-confirm">
            Type the user's email to confirm
          </FieldLabel>
          <Input
            id="delete-email-confirm"
            type="email"
            placeholder={user?.email ?? ""}
            value={emailConfirmation}
            onChange={(e) => setEmailConfirmation(e.target.value)}
            disabled={isPending}
            aria-label="Confirm user email to enable deletion"
          />
        </Field>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleConfirm}
            disabled={!isConfirmed || isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? "Deleting..." : "Delete Permanently"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>   
  );
}
