import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
export declare class Photo extends BaseEntity {
    url: string;
    caption: string;
    location: string;
    geoLocation: Record<string, any>;
    user: User;
    post: Post;
}
