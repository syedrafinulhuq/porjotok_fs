import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';
import { PostsService } from '../posts/posts.service';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly postsService;
    constructor(commentsRepository: Repository<Comment>, postsService: PostsService);
    create(postId: string, createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
    findAllForPost(postId: string): Promise<Comment[]>;
    findOne(id: string): Promise<Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    remove(id: string): Promise<void>;
    likeComment(id: string, user: User): Promise<Comment>;
    unlikeComment(id: string, user: User): Promise<Comment>;
}
