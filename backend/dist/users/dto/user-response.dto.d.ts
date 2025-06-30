import { User } from '../entities/user.entity';
export declare class UserResponseDto {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    bio?: string;
    profilePicture?: string;
    coverPhoto?: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    constructor(user: Partial<User>);
}
