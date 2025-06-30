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
exports.HashtagsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hashtags_service_1 = require("./hashtags.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let HashtagsController = class HashtagsController {
    constructor(hashtagsService) {
        this.hashtagsService = hashtagsService;
    }
    findAll(trending, limit) {
        return this.hashtagsService.findAll(trending, limit);
    }
    findOne(name) {
        return this.hashtagsService.findOne(name);
    }
};
exports.HashtagsController = HashtagsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all hashtags' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all hashtags.' }),
    (0, swagger_1.ApiQuery)({ name: 'trending', required: false, type: Boolean, description: 'Get trending hashtags' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Limit the number of results' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('trending')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Number]),
    __metadata("design:returntype", void 0)
], HashtagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a hashtag by name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return found hashtag.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hashtag not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HashtagsController.prototype, "findOne", null);
exports.HashtagsController = HashtagsController = __decorate([
    (0, swagger_1.ApiTags)('hashtags'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('hashtags'),
    __metadata("design:paramtypes", [hashtags_service_1.HashtagsService])
], HashtagsController);
//# sourceMappingURL=hashtags.controller.js.map