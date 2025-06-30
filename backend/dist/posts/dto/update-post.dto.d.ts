import { PrivacyLevel } from '../entities/post.entity';
export declare class UpdatePostDto {
    content?: string;
    location?: string;
    privacyLevel?: PrivacyLevel;
    hashtags?: string[];
    scheduledFor?: Date;
    isPinned?: boolean;
    commentsCount?: number;
}
