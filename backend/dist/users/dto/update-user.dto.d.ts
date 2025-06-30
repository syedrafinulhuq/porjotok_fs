import { UserRole } from '../entities/user.entity';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    profilePicture?: string;
    coverPhoto?: string;
    role?: UserRole;
}
