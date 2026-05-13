import { useState } from "react";
import { Users } from "lucide-react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AdminUsersFilters } from "../components/AdminUsersFilters";
import { AdminUsersTable } from "../components/AdminUsersTable";
import { UserDetailModal } from "../components/UserDetailModal";
import { ChangeRoleModal } from "../components/ChangeRoleModal";
import { DeactivateUserModal } from "../components/DeactivateUserModal";
import { ActivateUserModal } from "../components/ActivateUserModal";
import { DeleteUserModal } from "../components/DeleteUserModal";
import type { AdminUserListItem, AdminUserFilter } from "@/shared/types/adminUser.types";

const PAGE_SIZE = 10;

type ModalType = 'detail' | 'changeRole' | 'deactivate' | 'activate' | 'delete' | null;

export function AdminUsersPage() {
  const { userId: currentUserId } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Partial<AdminUserFilter>>({});
  const [selectedUser, setSelectedUser] = useState<AdminUserListItem | null>(null);
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const filters: AdminUserFilter = {
    page: currentPage,
    pageSize: PAGE_SIZE,
    ...activeFilters,
  };

  const { data, isLoading } = useAdminUsers(filters);

  const handleFilter = (newFilters: Partial<AdminUserFilter>) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const openWith = (modal: ModalType, user: AdminUserListItem) => {
    setSelectedUser(user);
    setOpenModal(modal);
  };

  const closeModal = () => {
    setOpenModal(null);
    setSelectedUser(null);
  };

  return (
    <>
      <header className="flex items-center gap-3">
        <Users className="h-7 w-7" />
        <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
      </header>

      <AdminUsersFilters
        onFilter={handleFilter}
        onClear={handleClear}
        loading={isLoading}
      />

      <AdminUsersTable
        data={data?.items ?? []}
        totalCount={data?.totalCount ?? 0}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        currentUserId={currentUserId}
        onPageChange={setCurrentPage}
        onDetails={(user) => openWith('detail', user)}
        onChangeRole={(user) => openWith('changeRole', user)}
        onDeactivate={(user) => openWith('deactivate', user)}
        onActivate={(user) => openWith('activate', user)}
        onDelete={(user) => openWith('delete', user)}
      />

      <UserDetailModal
        userId={openModal === 'detail' ? (selectedUser?.id ?? null) : null}
        isOpen={openModal === 'detail'}
        onClose={closeModal}
      />

      <ChangeRoleModal
        key={selectedUser?.id ?? 'change-role'}
        user={openModal === 'changeRole' ? selectedUser : null}
        isOpen={openModal === 'changeRole'}
        onClose={closeModal}
      />

      <DeactivateUserModal
        user={openModal === 'deactivate' ? selectedUser : null}
        isOpen={openModal === 'deactivate'}
        onClose={closeModal}
      />

      <ActivateUserModal
        user={openModal === 'activate' ? selectedUser : null}
        isOpen={openModal === 'activate'}
        onClose={closeModal}
      />

      <DeleteUserModal
        user={openModal === 'delete' ? selectedUser : null}
        isOpen={openModal === 'delete'}
        onClose={closeModal}
      />
    </>
  );
}
