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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversation_entity_1 = require("./entities/conversation.entity");
const message_entity_1 = require("./entities/message.entity");
const users_service_1 = require("../users/users.service");
let MessagesService = class MessagesService {
    constructor(conversationRepository, messageRepository, usersService) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.usersService = usersService;
    }
    async createConversation(createConversationDto, currentUser) {
        const { participantIds } = createConversationDto, conversationData = __rest(createConversationDto, ["participantIds"]);
        const uniqueParticipantIds = [...new Set([...participantIds, currentUser.id])];
        const participants = [];
        for (const id of uniqueParticipantIds) {
            try {
                const user = await this.usersService.findOne(id);
                participants.push(user);
            }
            catch (error) {
            }
        }
        const conversation = this.conversationRepository.create(Object.assign(Object.assign({}, conversationData), { participants, isGroupChat: participants.length > 2 || conversationData.isGroupChat }));
        return this.conversationRepository.save(conversation);
    }
    async getUserConversations(userId) {
        return this.conversationRepository.createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.participants', 'participant')
            .leftJoinAndSelect('conversation.messages', 'message')
            .where('participant.id = :userId', { userId })
            .orderBy('message.createdAt', 'DESC')
            .getMany();
    }
    async getConversationById(id) {
        const conversation = await this.conversationRepository.findOne({
            where: { id },
            relations: ['participants'],
        });
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${id} not found`);
        }
        return conversation;
    }
    async sendMessage(conversationId, createMessageDto, sender) {
        const conversation = await this.getConversationById(conversationId);
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${conversationId} not found`);
        }
        const message = this.messageRepository.create(Object.assign(Object.assign({}, createMessageDto), { sender,
            conversation }));
        return this.messageRepository.save(message);
    }
    async getConversationMessages(conversationId) {
        return this.messageRepository.find({
            where: { conversation: { id: conversationId } },
            order: { createdAt: 'ASC' },
            relations: ['sender'],
        });
    }
    async leaveConversation(conversationId, userId) {
        const conversation = await this.getConversationById(conversationId);
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${conversationId} not found`);
        }
        conversation.participants = conversation.participants.filter(participant => participant.id !== userId);
        if (conversation.isGroupChat && conversation.participants.length > 0) {
            await this.conversationRepository.save(conversation);
        }
        else if (conversation.participants.length <= 1) {
            await this.conversationRepository.remove(conversation);
        }
        else {
            await this.conversationRepository.remove(conversation);
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map