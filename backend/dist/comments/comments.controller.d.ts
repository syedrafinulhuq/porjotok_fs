import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(postId: string, createCommentDto: CreateCommentDto, user: User): Promise<import("./entities/comment.entity").Comment>;
    findAll(postId: string): Promise<import("./entities/comment.entity").Comment[]>;
    findOne(id: string): Promise<import("./entities/comment.entity").Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto, user: User): Promise<import("./entities/comment.entity").Comment>;
    remove(id: string, user: User): Promise<void>;
    likeComment(id: string, user: User): Promise<import("./entities/comment.entity").Comment>;
    unlikeComment(id: string, user: User): Promise<import("./entities/comment.entity").Comment>;
}
