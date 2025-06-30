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
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const friend_request_entity_1 = require("./entities/friend-request.entity");
const users_service_1 = require("../users/users.service");
let FriendsService = class FriendsService {
    constructor(friendRequestRepository, userRepository, usersService) {
        this.friendRequestRepository = friendRequestRepository;
        this.userRepository = userRepository;
        this.usersService = usersService;
    }
    async sendFriendRequest(senderId, receiverId) {
        const sender = await this.usersService.findOne(senderId);
        const receiver = await this.usersService.findOne(receiverId);
        if (!sender || !receiver) {
            throw new common_1.NotFoundException('User not found');
        }
        const areFriends = await this.areUsersFriends(senderId, receiverId);
        if (areFriends) {
            throw new common_1.ConflictException('Users are already friends');
        }
        const existingRequest = await this.friendRequestRepository.findOne({
            where: [
                { sender: { id: senderId }, receiver: { id: receiverId }, status: friend_request_entity_1.FriendRequestStatus.PENDING },
                { sender: { id: receiverId }, receiver: { id: senderId }, status: friend_request_entity_1.FriendRequestStatus.PENDING },
            ],
        });
        if (existingRequest) {
            throw new common_1.ConflictException('A friend request already exists between these users');
        }
        const friendRequest = this.friendRequestRepository.create({
            sender,
            receiver,
            status: friend_request_entity_1.FriendRequestStatus.PENDING,
        });
        return this.friendRequestRepository.save(friendRequest);
    }
    async getFriendRequestById(requestId) {
        return this.friendRequestRepository.findOne({
            where: { id: requestId },
            relations: ['sender', 'receiver'],
        });
    }
    async respondToFriendRequest(requestId, status) {
        const request = await this.getFriendRequestById(requestId);
        if (!request) {
            throw new common_1.NotFoundException(`Friend request with ID ${requestId} not found`);
        }
        request.status = status;
        return this.friendRequestRepository.save(request);
    }
    async getFriendRequests(userId) {
        const sent = await this.friendRequestRepository.find({
            where: { sender: { id: userId }, status: friend_request_entity_1.FriendRequestStatus.PENDING },
            relations: ['receiver'],
        });
        const received = await this.friendRequestRepository.find({
            where: { receiver: { id: userId }, status: friend_request_entity_1.FriendRequestStatus.PENDING },
            relations: ['sender'],
        });
        return { sent, received };
    }
    async getFriends(userId) {
        const acceptedRequests = await this.friendRequestRepository.find({
            where: [
                { sender: { id: userId }, status: friend_request_entity_1.FriendRequestStatus.ACCEPTED },
                { receiver: { id: userId }, status: friend_request_entity_1.FriendRequestStatus.ACCEPTED },
            ],
            relations: ['sender', 'receiver'],
        });
        return acceptedRequests.map(request => {
            return request.sender.id === userId ? request.receiver : request.sender;
        });
    }
    async getFriendIds(userId) {
        const friends = await this.getFriends(userId);
        return friends.map(friend => friend.id);
    }
    async areUsersFriends(user1Id, user2Id) {
        const request = await this.friendRequestRepository.findOne({
            where: [
                { sender: { id: user1Id }, receiver: { id: user2Id }, status: friend_request_entity_1.FriendRequestStatus.ACCEPTED },
                { sender: { id: user2Id }, receiver: { id: user1Id }, status: friend_request_entity_1.FriendRequestStatus.ACCEPTED },
            ],
        });
        return !!request;
    }
    async removeFriend(userId, friendId) {
        const friendRequest = await this.friendRequestRepository.findOne({
            where: [
                { sender: { id: userId }, receiver: { id: friendId }, status: friend_request_entity_1.FriendRequestStatus.ACCEPTED },
                { sender: { id: friendId }, receiver: { id: userId }, status: friend_request_entity_1.FriendRequestStatus.ACCEPTED },
            ],
        });
        if (!friendRequest) {
            throw new common_1.NotFoundException('Friend relationship not found');
        }
        await this.friendRequestRepository.remove(friendRequest);
    }
    async getFriendSuggestions(userId) {
        const friends = await this.getFriends(userId);
        const friendIds = friends.map(friend => friend.id);
        const suggestions = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id != :userId', { userId })
            .andWhere('user.id NOT IN (:...friendIds)', { friendIds: friendIds.length ? friendIds : ['no-friends'] })
            .limit(10)
            .getMany();
        return suggestions;
    }
};
exports.FriendsService = FriendsService;
exports.FriendsService = FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friend_request_entity_1.FriendRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], FriendsService);
//# sourceMappingURL=friends.service.js.map