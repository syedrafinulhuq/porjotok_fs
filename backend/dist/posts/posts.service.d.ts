import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { HashtagsService } from '../hashtags/hashtags.service';
import { FriendsService } from '../friends/friends.service';
export declare class PostsService {
    private readonly postsRepository;
    private readonly hashtagsService;
    private readonly friendsService;
    constructor(postsRepository: Repository<Post>, hashtagsService: HashtagsService, friendsService: FriendsService);
    create(createPostDto: CreatePostDto, user: User): Promise<Post>;
    findAll(filters: {
        hashtag?: string;
        location?: string;
        userId?: string;
    }, currentUser: User): Promise<Post[]>;
    getFeed(user: User): Promise<Post[]>;
    findOne(id: string, currentUser: User): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: string): Promise<void>;
    likePost(id: string, user: User): Promise<Post>;
    unlikePost(id: string, user: User): Promise<Post>;
}
