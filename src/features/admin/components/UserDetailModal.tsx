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
      <span className="text-xs text-white/50 font-medium">{label}</span>
      <span className="text-sm text-white">{value}</span>
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
  if (!dateStr) return "Nunca";
  try {
    return format(new Date(dateStr), "dd/MM/yyyy HH:mm");
  } catch {
    return "Nunca";
  }
}

function UserDetailContent({ userId }: Readonly<{ userId: string | null }>) {
  const { data: user, isLoading } = useAdminUserDetail(userId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => (
          <div key={key} className="flex flex-col gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      <DetailRow label="Nome completo" value={user.fullName} />
      <DetailRow label="Email" value={user.email} />
      <DetailRow label="Apelido" value={user.nickname ?? "—"} />
      <DetailRow label="Função" value={user.role} />
      <DetailRow label="Status" value={user.isActive ? "Ativo" : "Inativo"} />
      <DetailRow label="Criado em" value={formatDateTime(user.createdAt)} />
      <DetailRow label="Último acesso" value={formatDateTime(user.lastLogin)} />
      <DetailRow label="CPF/Documento" value={user.documentNumber ?? "—"} />
      <DetailRow label="Data de nascimento" value={formatDate(user.birthDate)} />
      <DetailRow label="Endereço" value={user.address ?? "—"} />
      <DetailRow label="Cidade" value={user.city ?? "—"} />
      <DetailRow label="CEP" value={user.postalCode ?? "—"} />
      <DetailRow label="País" value={user.country ?? "—"} />
    </div>
  );
}

export function UserDetailModal({ userId, isOpen, onClose }: Readonly<UserDetailModalProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Detalhes do usuário</DialogTitle>
          <DialogDescription className="text-white/70">
            Visualização dos dados do usuário selecionado.
          </DialogDescription>
        </DialogHeader>
        <UserDetailContent userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
