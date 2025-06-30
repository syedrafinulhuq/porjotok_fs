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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("./entities/photo.entity");
const posts_service_1 = require("../posts/posts.service");
const friends_service_1 = require("../friends/friends.service");
let PhotosService = class PhotosService {
    constructor(photosRepository, postsService, friendsService) {
        this.photosRepository = photosRepository;
        this.postsService = postsService;
        this.friendsService = friendsService;
    }
    async create(createPhotoDto, user) {
        const { postId } = createPhotoDto, photoData = __rest(createPhotoDto, ["postId"]);
        const photo = this.photosRepository.create(Object.assign(Object.assign({}, photoData), { user }));
        if (postId) {
            const post = await this.postsService.findOne(postId, user);
            if (!post) {
                throw new common_1.NotFoundException(`Post with ID ${postId} not found`);
            }
            photo.post = post;
        }
        return this.photosRepository.save(photo);
    }
    async findAll(currentUser) {
        const friendIds = await this.friendsService.getFriendIds(currentUser.id);
        return this.photosRepository.createQueryBuilder('photo')
            .leftJoinAndSelect('photo.user', 'user')
            .leftJoinAndSelect('photo.post', 'post')
            .where('(post.privacyLevel = :public OR (post.privacyLevel = :friends AND user.id IN (:...friendIds)) OR user.id = :userId)', {
            public: 'public',
            friends: 'friends',
            friendIds: friendIds.length ? friendIds : ['no-friends'],
            userId: currentUser.id,
        })
            .orderBy('photo.createdAt', 'DESC')
            .getMany();
    }
    async findByUser(userId, currentUser) {
        const areFriends = await this.friendsService.areUsersFriends(userId, currentUser.id);
        const queryBuilder = this.photosRepository.createQueryBuilder('photo')
            .leftJoinAndSelect('photo.user', 'user')
            .leftJoinAndSelect('photo.post', 'post')
            .where('user.id = :userId', { userId });
        if (userId !== currentUser.id) {
            if (areFriends) {
                queryBuilder.andWhere('(post.privacyLevel = :public OR post.privacyLevel = :friends)', {
                    public: 'public',
                    friends: 'friends',
                });
            }
            else {
                queryBuilder.andWhere('post.privacyLevel = :public', { public: 'public' });
            }
        }
        return queryBuilder.orderBy('photo.createdAt', 'DESC').getMany();
    }
    async findOne(id, currentUser) {
        const photo = await this.photosRepository.findOne({
            where: { id },
            relations: ['user', 'post'],
        });
        if (!photo) {
            throw new common_1.NotFoundException(`Photo with ID ${id} not found`);
        }
        if (photo.post) {
            const areFriends = await this.friendsService.areUsersFriends(photo.user.id, currentUser.id);
            if (photo.post.privacyLevel === 'private' && photo.user.id !== currentUser.id ||
                photo.post.privacyLevel === 'friends' && !areFriends && photo.user.id !== currentUser.id) {
                throw new common_1.NotFoundException(`Photo with ID ${id} not found`);
            }
        }
        return photo;
    }
    async remove(id) {
        const photo = await this.photosRepository.findOne({ where: { id } });
        if (!photo) {
            throw new common_1.NotFoundException(`Photo with ID ${id} not found`);
        }
        await this.photosRepository.remove(photo);
    }
};
exports.PhotosService = PhotosService;
exports.PhotosService = PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        posts_service_1.PostsService,
        friends_service_1.FriendsService])
], PhotosService);
//# sourceMappingURL=photos.service.js.map