import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';
export declare class Hashtag extends BaseEntity {
    name: string;
    postsCount: number;
    posts: Post[];
}
