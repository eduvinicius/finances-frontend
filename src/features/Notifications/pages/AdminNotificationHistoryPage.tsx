import { format } from "date-fns";
import { Bell } from "lucide-react";
import { AppTable, type Column } from "@/components/ui/Table/appTable";
import { useNotificationHistory } from "../hooks/useNotificationHistory";
import type { AdminNotificationResponse } from "../api/adminNotificationService";
import { TARGETING_MODE_LABELS, DELIVERY_CHANNEL_LABELS } from "@/shared/constants/notificationOptions.const";

interface AdminNotificationRow extends AdminNotificationResponse {
  [key: string]: unknown;
}

const columns: Column<AdminNotificationRow>[] = [
  {
    header: "Título",
    accessor: "title",
  },
  {
    header: "Mensagem",
    accessor: (row) => (row.body.length > 60 ? `${row.body.slice(0, 60)}…` : row.body),
  },
  {
    header: "Destinatários",
    accessor: (row) => TARGETING_MODE_LABELS[row.targetingMode] ?? row.targetingMode,
  },
  {
    header: "Canal",
    accessor: (row) => DELIVERY_CHANNEL_LABELS[row.deliveryChannel] ?? row.deliveryChannel,
  },
  {
    header: "Enviado em",
    accessor: (row) => {
      try {
        return format(new Date(row.createdAt), "dd/MM/yyyy HH:mm");
      } catch {
        return row.createdAt;
      }
    },
  },
];

export function AdminNotificationHistoryPage() {
  const { data, isLoading } = useNotificationHistory();

  return (
    <>
      <header className="flex items-center gap-3">
        <Bell className="h-7 w-7" />
        <h1 className="text-3xl font-bold">Histórico de Notificações</h1>
      </header>

      <AppTable<AdminNotificationRow>
        data={(data ?? []) as AdminNotificationRow[]}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhuma notificação enviada ainda"
        getRowKey={(row) => row.id}
      />
    </>
  );
}
