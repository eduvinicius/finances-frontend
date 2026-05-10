import { format } from "date-fns";
import { Eye, RefreshCw, UserX, UserCheck, Trash2 } from "lucide-react";
import { AppTable, type Column } from "@/components/ui/Table/appTable";
import { AppPaginator } from "@/components/ui/Paginator/appPaginator";
import { Button } from "@/components/ui/Button";
import type { AdminUserListItem } from "@/shared/types/adminUser.types";

interface AdminUsersTableProps {
  data: AdminUserListItem[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  currentUserId: string | null;
  onPageChange: (page: number) => void;
  onDetails: (user: AdminUserListItem) => void;
  onChangeRole: (user: AdminUserListItem) => void;
  onDeactivate: (user: AdminUserListItem) => void;
  onActivate: (user: AdminUserListItem) => void;
  onDelete: (user: AdminUserListItem) => void;
}

interface AdminUserRow extends AdminUserListItem {
  [key: string]: unknown;
}

function RoleBadge({ role }: Readonly<{ role: 'Admin' | 'User' }>) {
  if (role === 'Admin') {
    return (
      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
      Usuário
    </span>
  );
}

function StatusBadge({ isActive }: Readonly<{ isActive: boolean }>) {
  if (isActive) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
        Ativo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
      Inativo
    </span>
  );
}

function formatDateOrNever(dateStr: string | null): string {
  if (!dateStr) return "Nunca";
  try {
    return format(new Date(dateStr), "dd/MM/yyyy HH:mm");
  } catch {
    return "Nunca";
  }
}

export function AdminUsersTable({
  data,
  totalCount,
  currentPage,
  pageSize,
  isLoading,
  currentUserId,
  onPageChange,
  onDetails,
  onChangeRole,
  onDeactivate,
  onActivate,
  onDelete,
}: Readonly<AdminUsersTableProps>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const columns: Column<AdminUserRow>[] = [
    {
      header: "Nome completo",
      accessor: "fullName",
    },
    {
      header: "Apelido",
      accessor: (row) => row.nickname ?? "—",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Função",
      accessor: "role",
      cell: (_value, row) => <RoleBadge role={row.role} />,
    },
    {
      header: "Status",
      accessor: "isActive",
      cell: (_value, row) => <StatusBadge isActive={row.isActive} />,
    },
    {
      header: "Criado em",
      accessor: (row) => formatDateOrNever(row.createdAt),
    },
    {
      header: "Último acesso",
      accessor: (row) => formatDateOrNever(row.lastLogin),
    },
    {
      header: "Ações",
      accessor: "id",
      cell: (_value, row) => {
        const isSelf = row.id === currentUserId;

        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              title="Ver detalhes"
              className="text-foreground"
              onClick={() => onDetails(row)}
              aria-label={`Ver detalhes de ${row.fullName}`}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              title="Alterar função"
              className="text-foreground"
              disabled={isSelf}
              onClick={() => onChangeRole(row)}
              aria-label={`Alterar função de ${row.fullName}`}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            {row.isActive ? (
              <Button
                variant="ghost"
                size="sm"
                title="Desativar usuário"
                className="text-foreground"
                disabled={isSelf}
                onClick={() => onDeactivate(row)}
                aria-label={`Desativar ${row.fullName}`}
              >
                <UserX className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                title="Ativar usuário"
                className="text-foreground"
                disabled={isSelf}
                onClick={() => onActivate(row)}
                aria-label={`Ativar ${row.fullName}`}
              >
                <UserCheck className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              title="Excluir usuário"
              disabled={isSelf}
              onClick={() => onDelete(row)}
              aria-label={`Excluir ${row.fullName}`}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <AppTable<AdminUserRow>
        data={data as AdminUserRow[]}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum usuário encontrado."
        getRowKey={(row) => row.id}
      />
      {totalPages >= 1 && (
        <AppPaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
