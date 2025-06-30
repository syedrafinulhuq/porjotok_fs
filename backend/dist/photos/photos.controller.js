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
exports.PhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const photos_service_1 = require("./photos.service");
const create_photo_dto_1 = require("./dto/create-photo.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let PhotosController = class PhotosController {
    constructor(photosService) {
        this.photosService = photosService;
    }
    create(createPhotoDto, user) {
        return this.photosService.create(createPhotoDto, user);
    }
    uploadPhoto(file, createPhotoDto, user) {
        const url = `https://example.com/photos/${file.originalname}`;
        return this.photosService.create(Object.assign(Object.assign({}, createPhotoDto), { url }), user);
    }
    findAll(user) {
        return this.photosService.findAll(user);
    }
    findByUser(userId, user) {
        return this.photosService.findByUser(userId, user);
    }
    findOne(id, user) {
        return this.photosService.findOne(id, user);
    }
    async remove(id, user) {
        const photo = await this.photosService.findOne(id, user);
        if (!photo) {
            throw new common_1.NotFoundException(`Photo with ID ${id} not found`);
        }
        if (photo.user.id !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own photos');
        }
        return this.photosService.remove(id);
    }
};
exports.PhotosController = PhotosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new photo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Photo created successfully.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_photo_dto_1.CreatePhotoDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a photo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Photo uploaded successfully.' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                caption: {
                    type: 'string',
                },
                location: {
                    type: 'string',
                },
                postId: {
                    type: 'string',
                },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all photos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all photos.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get photos by user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return photos by user.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a photo by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return found photo.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Photo not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a photo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Photo deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Photo not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "remove", null);
exports.PhotosController = PhotosController = __decorate([
    (0, swagger_1.ApiTags)('photos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('photos'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotosController);
//# sourceMappingURL=photos.controller.js.map