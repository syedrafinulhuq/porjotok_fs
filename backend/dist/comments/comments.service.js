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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const posts_service_1 = require("../posts/posts.service");
let CommentsService = class CommentsService {
    constructor(commentsRepository, postsService) {
        this.commentsRepository = commentsRepository;
        this.postsService = postsService;
    }
    async create(postId, createCommentDto, user) {
        const { parentId } = createCommentDto, commentData = __rest(createCommentDto, ["parentId"]);
        const post = await this.postsService.findOne(postId, user);
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${postId} not found`);
        }
        const comment = this.commentsRepository.create(Object.assign(Object.assign({}, commentData), { author: user, post }));
        if (parentId) {
            const parentComment = await this.commentsRepository.findOne({ where: { id: parentId } });
            if (!parentComment) {
                throw new common_1.NotFoundException(`Parent comment with ID ${parentId} not found`);
            }
            comment.parent = parentComment;
        }
        post.commentsCount += 1;
        await this.postsService.update(postId, { commentsCount: post.commentsCount });
        return this.commentsRepository.save(comment);
    }
    async findAllForPost(postId) {
        return this.commentsRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.author', 'author')
            .leftJoinAndSelect('comment.replies', 'replies')
            .leftJoinAndSelect('replies.author', 'replyAuthor')
            .where('comment.post.id = :postId', { postId })
            .andWhere('comment.parent IS NULL')
            .orderBy('comment.createdAt', 'ASC')
            .addOrderBy('replies.createdAt', 'ASC')
            .getMany();
    }
    async findOne(id) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['author', 'post', 'parent', 'replies', 'likedBy'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }
    async update(id, updateCommentDto) {
        const comment = await this.findOne(id);
        Object.assign(comment, updateCommentDto);
        return this.commentsRepository.save(comment);
    }
    async remove(id) {
        const comment = await this.findOne(id);
        if (comment.replies && comment.replies.length > 0) {
            comment.content = '[deleted]';
            await this.commentsRepository.save(comment);
        }
        else {
            await this.commentsRepository.remove(comment);
            const post = comment.post;
            post.commentsCount = Math.max(0, post.commentsCount - 1);
            await this.postsService.update(post.id, { commentsCount: post.commentsCount });
        }
    }
    async likeComment(id, user) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['likedBy'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        const alreadyLiked = comment.likedBy.some(likedUser => likedUser.id === user.id);
        if (!alreadyLiked) {
            comment.likedBy.push(user);
            comment.likesCount += 1;
            await this.commentsRepository.save(comment);
        }
        return comment;
    }
    async unlikeComment(id, user) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['likedBy'],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        comment.likedBy = comment.likedBy.filter(likedUser => likedUser.id !== user.id);
        comment.likesCount = Math.max(0, comment.likesCount - 1);
        await this.commentsRepository.save(comment);
        return comment;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        posts_service_1.PostsService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map