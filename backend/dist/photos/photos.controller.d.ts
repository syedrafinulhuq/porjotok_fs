import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/entities/user.entity';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    create(createPhotoDto: CreatePhotoDto, user: User): Promise<import("./entities/photo.entity").Photo>;
    uploadPhoto(file: Express.Multer.File, createPhotoDto: Partial<CreatePhotoDto>, user: User): Promise<import("./entities/photo.entity").Photo>;
    findAll(user: User): Promise<import("./entities/photo.entity").Photo[]>;
    findByUser(userId: string, user: User): Promise<import("./entities/photo.entity").Photo[]>;
    findOne(id: string, user: User): Promise<import("./entities/photo.entity").Photo>;
    remove(id: string, user: User): Promise<void>;
}
