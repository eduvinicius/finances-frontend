import { httpClient } from "@/shared/api/httpClient";
import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import type { IPaginatedBaseResponse } from "@/shared/types/pagination.types";
import type { AdminUserDetail, AdminUserFilter, AdminUserListItem, UserSearchResult } from "@/shared/types/adminUser.types";
import { UserRole } from "@/shared/enums/userRoleEnum";
import type { AxiosResponse } from "axios";

const baseEndpoint = getApiEndpoint(QUERY_KEYS.adminUsers.all);
const getAllEndpoint = getApiEndpoint(QUERY_KEYS.adminUsers.getAll());

export const adminUserService = {

  async getAll(filters: AdminUserFilter): Promise<IPaginatedBaseResponse<AdminUserListItem[]>> {
    const response: AxiosResponse<IPaginatedBaseResponse<AdminUserListItem[]>> =
      await httpClient.post(`/${getAllEndpoint}`, filters);
    return response.data;
  },

  async getById(id: string): Promise<AdminUserDetail> {
    const response: AxiosResponse<AdminUserDetail> =
      await httpClient.get(`/${baseEndpoint}/${id}`);
    return response.data;
  },

  async changeRole(id: string, role: UserRole): Promise<void> {
    await httpClient.patch(`/${baseEndpoint}/${id}/role`, { role });
  },

  async deactivate(id: string): Promise<void> {
    await httpClient.patch(`/${baseEndpoint}/${id}/deactivate`);
  },

  async activate(id: string): Promise<void> {
    await httpClient.patch(`/${baseEndpoint}/${id}/activate`);
  },

  async deleteUser(id: string): Promise<void> {
    await httpClient.delete(`/${baseEndpoint}/${id}`);
  },

  async searchByName(name: string): Promise<UserSearchResult[]> {
    const response: AxiosResponse<UserSearchResult[]> =
      await httpClient.get(`/${baseEndpoint}/search`, { params: { name } });
    return response.data;
  },
};
