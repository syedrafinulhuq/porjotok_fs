import { PrivacyLevel } from '../entities/post.entity';
export declare class CreatePostDto {
    content: string;
    location?: string;
    privacyLevel?: PrivacyLevel;
    hashtags?: string[];
    scheduledFor?: Date;
}
