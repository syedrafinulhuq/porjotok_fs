"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hashtag_entity_1 = require("./entities/hashtag.entity");
let HashtagsService = class HashtagsService {
    constructor(hashtagsRepository) {
        this.hashtagsRepository = hashtagsRepository;
    }
    async findAll(trending = false, limit = 20) {
        const queryBuilder = this.hashtagsRepository.createQueryBuilder('hashtag');
        if (trending) {
            queryBuilder.orderBy('hashtag.postsCount', 'DESC');
        }
        else {
            queryBuilder.orderBy('hashtag.name', 'ASC');
        }
        return queryBuilder.take(limit).getMany();
    }
    async findOne(name) {
        const hashtag = await this.hashtagsRepository.findOne({
            where: { name },
            relations: ['posts', 'posts.author'],
        });
        if (!hashtag) {
            throw new common_1.NotFoundException(`Hashtag #${name} not found`);
        }
        return hashtag;
    }
    async findOrCreate(name) {
        let hashtag = await this.hashtagsRepository.findOne({ where: { name } });
        if (!hashtag) {
            hashtag = this.hashtagsRepository.create({ name });
            await this.hashtagsRepository.save(hashtag);
        }
        return hashtag;
    }
    async findOrCreateMany(names) {
        const hashtags = [];
        for (const name of names) {
            const normalizedName = name.toLowerCase().replace(/[^\w]/g, '');
            if (normalizedName) {
                const hashtag = await this.findOrCreate(normalizedName);
                hashtags.push(hashtag);
            }
        }
        return hashtags;
    }
};
exports.HashtagsService = HashtagsService;
exports.HashtagsService = HashtagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hashtag_entity_1.Hashtag)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HashtagsService);
//# sourceMappingURL=hashtags.service.js.map