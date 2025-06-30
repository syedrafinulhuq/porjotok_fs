import { Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';
export declare class HashtagsService {
    private readonly hashtagsRepository;
    constructor(hashtagsRepository: Repository<Hashtag>);
    findAll(trending?: boolean, limit?: number): Promise<Hashtag[]>;
    findOne(name: string): Promise<Hashtag>;
    findOrCreate(name: string): Promise<Hashtag>;
    findOrCreateMany(names: string[]): Promise<Hashtag[]>;
}
