import { getApiEndpoint, QUERY_KEYS } from "@/shared/constants/queryKeys";
import { httpClient } from "@/shared/api/httpClient";
import type { IUserApiResponse, UserFormValues } from "@/shared/types/user.types";

const getCurrentUserEndpoint = getApiEndpoint(QUERY_KEYS.auth.getCurrentUser());
const updateUserEndpoint = getApiEndpoint(QUERY_KEYS.auth.updateUser());

export const userService = {

    async getCurrentUser() {
        const response = await httpClient.get<IUserApiResponse>(`/${getCurrentUserEndpoint}`);
        const data = response.data;
        
        if (data.birthDate && typeof data.birthDate === 'string') {
            data.birthDate = new Date(data.birthDate);
        }
        
        return data;
    },

    async updateUser(userData: UserFormValues) {

        const payload = {
            ...userData,
            birthDate: userData.birthDate ? new Date(userData.birthDate).toISOString() : null,
        };

        const response = await httpClient.put<IUserApiResponse>(`/${updateUserEndpoint}`, payload);
        const data = response.data;
        if (data.birthDate && typeof data.birthDate === 'string') {
            data.birthDate = new Date(data.birthDate);
        }

        return data as UserFormValues;
    }
}