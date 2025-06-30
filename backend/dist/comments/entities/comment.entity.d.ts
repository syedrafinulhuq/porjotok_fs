import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
export declare class Comment extends BaseEntity {
    content: string;
    likesCount: number;
    author: User;
    post: Post;
    parent: Comment;
    replies: Comment[];
    likedBy: User[];
}
