import { HashtagsService } from './hashtags.service';
export declare class HashtagsController {
    private readonly hashtagsService;
    constructor(hashtagsService: HashtagsService);
    findAll(trending?: boolean, limit?: number): Promise<import("./entities/hashtag.entity").Hashtag[]>;
    findOne(name: string): Promise<import("./entities/hashtag.entity").Hashtag>;
}
