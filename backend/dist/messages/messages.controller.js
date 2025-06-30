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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let MessagesController = class MessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    createConversation(createConversationDto, user) {
        return this.messagesService.createConversation(createConversationDto, user);
    }
    getUserConversations(user) {
        return this.messagesService.getUserConversations(user.id);
    }
    async getConversation(id, user) {
        const conversation = await this.messagesService.getConversationById(id);
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${id} not found`);
        }
        const isParticipant = conversation.participants.some(participant => participant.id === user.id);
        if (!isParticipant) {
            throw new common_1.ForbiddenException('You are not a participant in this conversation');
        }
        return conversation;
    }
    async sendMessage(conversationId, createMessageDto, user) {
        const conversation = await this.messagesService.getConversationById(conversationId);
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${conversationId} not found`);
        }
        const isParticipant = conversation.participants.some(participant => participant.id === user.id);
        if (!isParticipant) {
            throw new common_1.ForbiddenException('You are not a participant in this conversation');
        }
        return this.messagesService.sendMessage(conversationId, createMessageDto, user);
    }
    async getMessages(conversationId, user) {
        const conversation = await this.messagesService.getConversationById(conversationId);
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${conversationId} not found`);
        }
        const isParticipant = conversation.participants.some(participant => participant.id === user.id);
        if (!isParticipant) {
            throw new common_1.ForbiddenException('You are not a participant in this conversation');
        }
        return this.messagesService.getConversationMessages(conversationId);
    }
    async leaveConversation(conversationId, user) {
        const conversation = await this.messagesService.getConversationById(conversationId);
        if (!conversation) {
            throw new common_1.NotFoundException(`Conversation with ID ${conversationId} not found`);
        }
        const isParticipant = conversation.participants.some(participant => participant.id === user.id);
        if (!isParticipant) {
            throw new common_1.ForbiddenException('You are not a participant in this conversation');
        }
        return this.messagesService.leaveConversation(conversationId, user.id);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Post)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new conversation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Conversation created successfully.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user conversations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user conversations.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getUserConversations", null);
__decorate([
    (0, common_1.Get)('conversations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a conversation by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return found conversation.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Post)('conversations/:id/messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a message in a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sent successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_message_dto_1.CreateMessageDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('conversations/:id/messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get messages in a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return conversation messages.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Delete)('conversations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Leave a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Left conversation successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden resource.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation not found.' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "leaveConversation", null);
exports.MessagesController = MessagesController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map