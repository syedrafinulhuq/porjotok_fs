import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/entities/user.entity';
import { PostsService } from '../posts/posts.service';
import { FriendsService } from '../friends/friends.service';
export declare class PhotosService {
    private readonly photosRepository;
    private readonly postsService;
    private readonly friendsService;
    constructor(photosRepository: Repository<Photo>, postsService: PostsService, friendsService: FriendsService);
    create(createPhotoDto: CreatePhotoDto, user: User): Promise<Photo>;
    findAll(currentUser: User): Promise<Photo[]>;
    findByUser(userId: string, currentUser: User): Promise<Photo[]>;
    findOne(id: string, currentUser: User): Promise<Photo>;
    remove(id: string): Promise<void>;
}
