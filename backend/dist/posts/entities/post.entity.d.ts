import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Photo } from '../../photos/entities/photo.entity';
import { Hashtag } from '../../hashtags/entities/hashtag.entity';
export declare enum PrivacyLevel {
    PUBLIC = "public",
    FRIENDS = "friends",
    PRIVATE = "private"
}
export declare class Post extends BaseEntity {
    content: string;
    location: string;
    privacyLevel: PrivacyLevel;
    likesCount: number;
    commentsCount: number;
    isPinned: boolean;
    scheduledFor: Date;
    author: User;
    comments: Comment[];
    photos: Photo[];
    likedBy: User[];
    hashtags: Hashtag[];
}
