import { Admin, User } from '@prisma/client';

export interface CreateAdminData {
    name: string;
    email: string;
    password: string;
    rut: string;
    isSuperAdmin: boolean;
    organizerId: number;
}

export interface AdminWithUser extends Admin {
    user: User;
}
