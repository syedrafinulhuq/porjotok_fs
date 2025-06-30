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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const hashtags_service_1 = require("../hashtags/hashtags.service");
const friends_service_1 = require("../friends/friends.service");
let PostsService = class PostsService {
    constructor(postsRepository, hashtagsService, friendsService) {
        this.postsRepository = postsRepository;
        this.hashtagsService = hashtagsService;
        this.friendsService = friendsService;
    }
    async create(createPostDto, user) {
        const { hashtags: hashtagNames } = createPostDto, postData = __rest(createPostDto, ["hashtags"]);
        const post = this.postsRepository.create(Object.assign(Object.assign({}, postData), { author: user }));
        await this.postsRepository.save(post);
        if (hashtagNames && hashtagNames.length > 0) {
            const hashtags = await this.hashtagsService.findOrCreateMany(hashtagNames);
            post.hashtags = hashtags;
            await this.postsRepository.save(post);
        }
        return post;
    }
    async findAll(filters, currentUser) {
        const queryBuilder = this.postsRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.photos', 'photos')
            .leftJoinAndSelect('post.hashtags', 'hashtags');
        if (filters.hashtag) {
            queryBuilder.andWhere('hashtags.name = :hashtag', { hashtag: filters.hashtag });
        }
        if (filters.location) {
            queryBuilder.andWhere('post.location ILIKE :location', { location: `%${filters.location}%` });
        }
        if (filters.userId) {
            queryBuilder.andWhere('author.id = :userId', { userId: filters.userId });
        }
        queryBuilder.andWhere('(post.privacyLevel = :public OR (post.privacyLevel = :friends AND author.id IN (:...friendIds)) OR author.id = :currentUserId)', {
            public: 'public',
            friends: 'friends',
            friendIds: await this.friendsService.getFriendIds(currentUser.id),
            currentUserId: currentUser.id,
        });
        return queryBuilder.orderBy('post.createdAt', 'DESC').getMany();
    }
    async getFeed(user) {
        const friendIds = await this.friendsService.getFriendIds(user.id);
        return this.postsRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.photos', 'photos')
            .leftJoinAndSelect('post.hashtags', 'hashtags')
            .where('author.id IN (:...ids)', { ids: [...friendIds, user.id] })
            .andWhere('(post.privacyLevel = :public OR (post.privacyLevel = :friends AND author.id IN (:...friendIds)) OR author.id = :userId)', {
            public: 'public',
            friends: 'friends',
            friendIds,
            userId: user.id,
        })
            .orderBy('post.createdAt', 'DESC')
            .getMany();
    }
    async findOne(id, currentUser) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['author', 'photos', 'hashtags', 'likedBy'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        const friendIds = await this.friendsService.getFriendIds(currentUser.id);
        if (post.privacyLevel === 'private' && post.author.id !== currentUser.id ||
            post.privacyLevel === 'friends' && post.author.id !== currentUser.id && !friendIds.includes(post.author.id)) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async update(id, updatePostDto) {
        const { hashtags: hashtagNames } = updatePostDto, postData = __rest(updatePostDto, ["hashtags"]);
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['hashtags'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        Object.assign(post, postData);
        if (hashtagNames && hashtagNames.length > 0) {
            const hashtags = await this.hashtagsService.findOrCreateMany(hashtagNames);
            post.hashtags = hashtags;
        }
        return this.postsRepository.save(post);
    }
    async remove(id) {
        const post = await this.postsRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        await this.postsRepository.softRemove(post);
    }
    async likePost(id, user) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['likedBy'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        const alreadyLiked = post.likedBy.some(likedUser => likedUser.id === user.id);
        if (!alreadyLiked) {
            post.likedBy.push(user);
            post.likesCount += 1;
            await this.postsRepository.save(post);
        }
        return post;
    }
    async unlikePost(id, user) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['likedBy'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        post.likedBy = post.likedBy.filter(likedUser => likedUser.id !== user.id);
        post.likesCount = Math.max(0, post.likesCount - 1);
        await this.postsRepository.save(post);
        return post;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashtags_service_1.HashtagsService,
        friends_service_1.FriendsService])
], PostsService);
//# sourceMappingURL=posts.service.js.map