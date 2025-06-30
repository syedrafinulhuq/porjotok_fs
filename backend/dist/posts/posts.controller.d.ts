import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { Post as PostEntity } from './entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, user: User): Promise<PostEntity>;
    findAll(hashtag?: string, location?: string, userId?: string, user?: User): Promise<PostEntity[]>;
    getFeed(user: User): Promise<PostEntity[]>;
    findOne(id: string, user: User): Promise<PostEntity>;
    update(id: string, updatePostDto: UpdatePostDto, user: User): Promise<PostEntity>;
    remove(id: string, user: User): Promise<void>;
    likePost(id: string, user: User): Promise<PostEntity>;
    unlikePost(id: string, user: User): Promise<PostEntity>;
}
