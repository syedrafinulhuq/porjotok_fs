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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    create(createPostDto, user) {
        return this.postsService.create(createPostDto, user);
    }
    findAll(hashtag, location, userId, user) {
        return this.postsService.findAll({ hashtag, location, userId }, user);
    }
    getFeed(user) {
        return this.postsService.getFeed(user);
    }
    async findOne(id, user) {
        const post = await this.postsService.findOne(id, user);
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async update(id, updatePostDto, user) {
        const post = await this.postsService.findOne(id, user);
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        if (post.author.id !== user.id) {
            throw new common_1.ForbiddenException('You can only update your own posts');
        }
        return this.postsService.update(id, updatePostDto);
    }
    async remove(id, user) {
        const post = await this.postsService.findOne(id, user);
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        if (post.author.id !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own posts');
        }
        return this.postsService.remove(id);
    }
    likePost(id, user) {
        return this.postsService.likePost(id, user);
    }
    unlikePost(id, user) {
        return this.postsService.unlikePost(id, user);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts (with optional filters)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return filtered posts.' }),
    (0, swagger_1.ApiQuery)({ name: 'hashtag', required: false, description: 'Filter by hashtag' }),
    (0, swagger_1.ApiQuery)({ name: 'location', required: false, description: 'Filter by location' }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, description: 'Filter by user ID' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('hashtag')),
    __param(1, (0, common_1.Query)('location')),
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('feed'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user feed (posts from followed users)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user feed.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a post by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return found post.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Like a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post liked successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)(':id/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlike a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post unliked successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Post not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "unlikePost", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map