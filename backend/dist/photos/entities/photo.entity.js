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
exports.Photo = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_entity_1 = require("../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const post_entity_1 = require("../../posts/entities/post.entity");
let Photo = class Photo extends base_entity_1.BaseEntity {
};
exports.Photo = Photo;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://google.com/photos/beach.jpg' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Beautfiul Dhaka' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "caption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dhaka, Bangladesh' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '{"lat": 123.456, "lng": 78.90}' }),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Photo.prototype, "geoLocation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.photos),
    __metadata("design:type", user_entity_1.User)
], Photo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, post => post.photos, { nullable: true }),
    __metadata("design:type", post_entity_1.Post)
], Photo.prototype, "post", void 0);
exports.Photo = Photo = __decorate([
    (0, typeorm_1.Entity)('photos')
], Photo);
//# sourceMappingURL=photo.entity.js.map