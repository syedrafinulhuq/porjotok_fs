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
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const friends_service_1 = require("./friends.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const friend_request_entity_1 = require("./entities/friend-request.entity");
let FriendsController = class FriendsController {
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    getFriends(user) {
        return this.friendsService.getFriends(user.id);
    }
    getFriendRequests(user) {
        return this.friendsService.getFriendRequests(user.id);
    }
    getFriendSuggestions(user) {
        return this.friendsService.getFriendSuggestions(user.id);
    }
    sendFriendRequest(receiverId, user) {
        return this.friendsService.sendFriendRequest(user.id, receiverId);
    }
    async acceptFriendRequest(requestId, user) {
        const request = await this.friendsService.getFriendRequestById(requestId);
        if (!request) {
            throw new common_1.NotFoundException(`Friend request with ID ${requestId} not found`);
        }
        if (request.receiver.id !== user.id) {
            throw new common_1.ForbiddenException('You can only accept requests sent to you');
        }
        if (request.status !== friend_request_entity_1.FriendRequestStatus.PENDING) {
            throw new common_1.ForbiddenException('This request is not pending');
        }
        return this.friendsService.respondToFriendRequest(requestId, friend_request_entity_1.FriendRequestStatus.ACCEPTED);
    }
    async rejectFriendRequest(requestId, user) {
        const request = await this.friendsService.getFriendRequestById(requestId);
        if (!request) {
            throw new common_1.NotFoundException(`Friend request with ID ${requestId} not found`);
        }
        if (request.receiver.id !== user.id) {
            throw new common_1.ForbiddenException('You can only reject requests sent to you');
        }
        if (request.status !== friend_request_entity_1.FriendRequestStatus.PENDING) {
            throw new common_1.ForbiddenException('This request is not pending');
        }
        return this.friendsService.respondToFriendRequest(requestId, friend_request_entity_1.FriendRequestStatus.REJECTED);
    }
    removeFriend(friendId, user) {
        return this.friendsService.removeFriend(user.id, friendId);
    }
};
exports.FriendsController = FriendsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user friends' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user friends.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get friend requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return friend requests.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "getFriendRequests", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get friend suggestions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return friend suggestions.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "getFriendSuggestions", null);
__decorate([
    (0, common_1.Post)('request/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Send friend request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Friend request sent successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)('request/:requestId/accept'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Accept friend request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend request accepted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Cannot accept this request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Friend request not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Post)('request/:requestId/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reject friend request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend request rejected successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Cannot reject this request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Friend request not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('requestId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "rejectFriendRequest", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove friend' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found or not a friend.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendsController.prototype, "removeFriend", null);
exports.FriendsController = FriendsController = __decorate([
    (0, swagger_1.ApiTags)('friends'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
//# sourceMappingURL=friends.controller.js.map