import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Photo } from '../../photos/entities/photo.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User extends BaseEntity {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    bio: string;
    profilePicture: string;
    coverPhoto: string;
    role: UserRole;
    isActive: boolean;
    posts: Post[];
    comments: Comment[];
    photos: Photo[];
    isAdmin(): boolean;
}
