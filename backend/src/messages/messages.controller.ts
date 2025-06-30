import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('messages')
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('conversations')
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'Conversation created successfully.' })
  @ApiBearerAuth()
  createConversation(
    @Body() createConversationDto: CreateConversationDto,
    @CurrentUser() user: User,
  ) {
    return this.messagesService.createConversation(createConversationDto, user);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get user conversations' })
  @ApiResponse({ status: 200, description: 'Return user conversations.' })
  @ApiBearerAuth()
  getUserConversations(@CurrentUser() user: User) {
    return this.messagesService.getUserConversations(user.id);
  }

  @Get('conversations/:id')
  @ApiOperation({ summary: 'Get a conversation by id' })
  @ApiResponse({ status: 200, description: 'Return found conversation.' })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  @ApiBearerAuth()
  async getConversation(@Param('id') id: string, @CurrentUser() user: User) {
    const conversation = await this.messagesService.getConversationById(id);
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    
    // Check if user is a participant
    const isParticipant = conversation.participants.some(participant => participant.id === user.id);
    
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }
    
    return conversation;
  }

  @Post('conversations/:id/messages')
  @ApiOperation({ summary: 'Send a message in a conversation' })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  @ApiBearerAuth()
  async sendMessage(
    @Param('id') conversationId: string,
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: User,
  ) {
    const conversation = await this.messagesService.getConversationById(conversationId);
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }
    
    // Check if user is a participant
    const isParticipant = conversation.participants.some(participant => participant.id === user.id);
    
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }
    
    return this.messagesService.sendMessage(conversationId, createMessageDto, user);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Get messages in a conversation' })
  @ApiResponse({ status: 200, description: 'Return conversation messages.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  @ApiBearerAuth()
  async getMessages(@Param('id') conversationId: string, @CurrentUser() user: User) {
    const conversation = await this.messagesService.getConversationById(conversationId);
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }
    
    // Check if user is a participant
    const isParticipant = conversation.participants.some(participant => participant.id === user.id);
    
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }
    
    return this.messagesService.getConversationMessages(conversationId);
  }

  @Delete('conversations/:id')
  @ApiOperation({ summary: 'Leave a conversation' })
  @ApiResponse({ status: 200, description: 'Left conversation successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Conversation not found.' })
  @ApiBearerAuth()
  async leaveConversation(@Param('id') conversationId: string, @CurrentUser() user: User) {
    const conversation = await this.messagesService.getConversationById(conversationId);
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }
    
    // Check if user is a participant
    const isParticipant = conversation.participants.some(participant => participant.id === user.id);
    
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }
    
    return this.messagesService.leaveConversation(conversationId, user.id);
  }
}