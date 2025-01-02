import { Admin, User } from '@prisma/client';

export interface AdminWithUser extends Admin {
    user: User;
}
