import { format } from "date-fns";
import { Eye, RefreshCw, UserX, Trash2 } from "lucide-react";
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
      User
    </span>
  );
}

function StatusBadge({ isActive }: Readonly<{ isActive: boolean }>) {
  if (isActive) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
      Inactive
    </span>
  );
}

function formatDateOrNever(dateStr: string | null): string {
  if (!dateStr) return "Never";
  try {
    return format(new Date(dateStr), "dd/MM/yyyy HH:mm");
  } catch {
    return "Never";
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
  onDelete,
}: Readonly<AdminUsersTableProps>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const columns: Column<AdminUserRow>[] = [
    {
      header: "Full Name",
      accessor: "fullName",
    },
    {
      header: "Nickname",
      accessor: (row) => row.nickname ?? "—",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
      cell: (_value, row) => <RoleBadge role={row.role} />,
    },
    {
      header: "Status",
      accessor: "isActive",
      cell: (_value, row) => <StatusBadge isActive={row.isActive} />,
    },
    {
      header: "Created At",
      accessor: (row) => formatDateOrNever(row.createdAt),
    },
    {
      header: "Last Login",
      accessor: (row) => formatDateOrNever(row.lastLogin),
    },
    {
      header: "Actions",
      accessor: "id",
      cell: (_value, row) => {
        const isSelf = row.id === currentUserId;

        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              title="View details"
              onClick={() => onDetails(row)}
              aria-label={`View details for ${row.fullName}`}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              title="Change role"
              disabled={isSelf}
              onClick={() => onChangeRole(row)}
              aria-label={`Change role for ${row.fullName}`}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              title={row.isActive ? "Deactivate user" : "Already inactive"}
              disabled={isSelf || !row.isActive}
              onClick={() => onDeactivate(row)}
              aria-label={`Deactivate ${row.fullName}`}
            >
              <UserX className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              title="Delete user"
              disabled={isSelf}
              onClick={() => onDelete(row)}
              aria-label={`Delete ${row.fullName}`}
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
        emptyMessage="No users found."
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
