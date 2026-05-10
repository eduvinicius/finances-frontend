import { httpClient } from "@/shared/api/httpClient";
import type { IPaginatedBaseResponse } from "@/shared/types/pagination.types";
import type { AdminUserDetail, AdminUserFilter, AdminUserListItem } from "@/shared/types/adminUser.types";
import type { AxiosResponse } from "axios";

export const adminUserService = {

  async getAll(filters: AdminUserFilter): Promise<IPaginatedBaseResponse<AdminUserListItem[]>> {
    const response: AxiosResponse<IPaginatedBaseResponse<AdminUserListItem[]>> =
      await httpClient.post('/admin/users/getAll', filters);
    return response.data;
  },

  async getById(id: string): Promise<AdminUserDetail> {
    const response: AxiosResponse<AdminUserDetail> =
      await httpClient.get(`/admin/users/${id}`);
    return response.data;
  },

  async changeRole(id: string, role: number): Promise<void> {
    await httpClient.patch(`/admin/users/${id}/role`, { role });
  },

  async deactivate(id: string): Promise<void> {
    await httpClient.patch(`/admin/users/${id}/deactivate`);
  },

  async deleteUser(id: string): Promise<void> {
    await httpClient.delete(`/admin/users/${id}`);
  },
};
