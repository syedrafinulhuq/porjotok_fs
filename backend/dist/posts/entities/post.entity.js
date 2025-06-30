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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PrivacyLevel = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const comment_entity_1 = require("../../comments/entities/comment.entity");
const photo_entity_1 = require("../../photos/entities/photo.entity");
const hashtag_entity_1 = require("../../hashtags/entities/hashtag.entity");
var PrivacyLevel;
(function (PrivacyLevel) {
    PrivacyLevel["PUBLIC"] = "public";
    PrivacyLevel["FRIENDS"] = "friends";
    PrivacyLevel["PRIVATE"] = "private";
})(PrivacyLevel || (exports.PrivacyLevel = PrivacyLevel = {}));
let Post = class Post extends base_entity_1.BaseEntity {
};
exports.Post = Post;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My amazing trip to Bali' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dhaka, Bangladesh' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PrivacyLevel, default: PrivacyLevel.PUBLIC }),
    (0, typeorm_1.Column)({ type: 'enum', enum: PrivacyLevel, default: PrivacyLevel.PUBLIC }),
    __metadata("design:type", String)
], Post.prototype, "privacyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 42 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "likesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "commentsCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "isPinned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-05-30T15:30:00Z', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Post.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.posts, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, comment => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.Photo, photo => photo.post),
    __metadata("design:type", Array)
], Post.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User),
    (0, typeorm_1.JoinTable)({ name: 'post_likes' }),
    __metadata("design:type", Array)
], Post.prototype, "likedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => hashtag_entity_1.Hashtag, hashtag => hashtag.posts),
    (0, typeorm_1.JoinTable)({ name: 'post_hashtags' }),
    __metadata("design:type", Array)
], Post.prototype, "hashtags", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)('posts')
], Post);
//# sourceMappingURL=post.entity.js.map