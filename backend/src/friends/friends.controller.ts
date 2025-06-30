import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { FriendRequestStatus } from './entities/friend-request.entity';

@ApiTags('friends')
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user friends' })
  @ApiResponse({ status: 200, description: 'Return user friends.' })
  @ApiBearerAuth()
  getFriends(@CurrentUser() user: User) {
    return this.friendsService.getFriends(user.id);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get friend requests' })
  @ApiResponse({ status: 200, description: 'Return friend requests.' })
  @ApiBearerAuth()
  getFriendRequests(@CurrentUser() user: User) {
    return this.friendsService.getFriendRequests(user.id);
  }

  @Get('suggestions')
  @ApiOperation({ summary: 'Get friend suggestions' })
  @ApiResponse({ status: 200, description: 'Return friend suggestions.' })
  @ApiBearerAuth()
  getFriendSuggestions(@CurrentUser() user: User) {
    return this.friendsService.getFriendSuggestions(user.id);
  }

  @Post('request/:userId')
  @ApiOperation({ summary: 'Send friend request' })
  @ApiResponse({ status: 201, description: 'Friend request sent successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  sendFriendRequest(
    @Param('userId') receiverId: string,
    @CurrentUser() user: User,
  ) {
    return this.friendsService.sendFriendRequest(user.id, receiverId);
  }

  @Post('request/:requestId/accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept friend request' })
  @ApiResponse({ status: 200, description: 'Friend request accepted successfully.' })
  @ApiResponse({ status: 403, description: 'Cannot accept this request.' })
  @ApiResponse({ status: 404, description: 'Friend request not found.' })
  @ApiBearerAuth()
  async acceptFriendRequest(
    @Param('requestId') requestId: string,
    @CurrentUser() user: User,
  ) {
    const request = await this.friendsService.getFriendRequestById(requestId);
    
    if (!request) {
      throw new NotFoundException(`Friend request with ID ${requestId} not found`);
    }
    
    if (request.receiver.id !== user.id) {
      throw new ForbiddenException('You can only accept requests sent to you');
    }
    
    if (request.status !== FriendRequestStatus.PENDING) {
      throw new ForbiddenException('This request is not pending');
    }
    
    return this.friendsService.respondToFriendRequest(requestId, FriendRequestStatus.ACCEPTED);
  }

  @Post('request/:requestId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject friend request' })
  @ApiResponse({ status: 200, description: 'Friend request rejected successfully.' })
  @ApiResponse({ status: 403, description: 'Cannot reject this request.' })
  @ApiResponse({ status: 404, description: 'Friend request not found.' })
  @ApiBearerAuth()
  async rejectFriendRequest(
    @Param('requestId') requestId: string,
    @CurrentUser() user: User,
  ) {
    const request = await this.friendsService.getFriendRequestById(requestId);
    
    if (!request) {
      throw new NotFoundException(`Friend request with ID ${requestId} not found`);
    }
    
    if (request.receiver.id !== user.id) {
      throw new ForbiddenException('You can only reject requests sent to you');
    }
    
    if (request.status !== FriendRequestStatus.PENDING) {
      throw new ForbiddenException('This request is not pending');
    }
    
    return this.friendsService.respondToFriendRequest(requestId, FriendRequestStatus.REJECTED);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Remove friend' })
  @ApiResponse({ status: 200, description: 'Friend removed successfully.' })
  @ApiResponse({ status: 404, description: 'User not found or not a friend.' })
  @ApiBearerAuth()
  removeFriend(
    @Param('userId') friendId: string,
    @CurrentUser() user: User,
  ) {
    return this.friendsService.removeFriend(user.id, friendId);
  }
}