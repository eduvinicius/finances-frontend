export interface AdminUserListItem {
  id: string;
  email: string;
  fullName: string;
  nickname: string | null;
  role: 'User' | 'Admin';
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}

export interface AdminUserDetail extends AdminUserListItem {
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  birthDate: string | null;
  documentNumber: string | null;
}

export interface AdminUserFilter {
  page: number;
  pageSize: number;
  fullName?: string;
  nickname?: string;
  documentNumber?: string;
  role?: number;
  createdAtFrom?: string;
  createdAtTo?: string;
}

