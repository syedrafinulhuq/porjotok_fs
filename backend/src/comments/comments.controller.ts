import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('comments')
@UseGuards(JwtAuthGuard)
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment on a post' })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiBearerAuth()
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.create(postId, createCommentDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiResponse({ status: 200, description: 'Return all comments for a post.' })
  @ApiBearerAuth()
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAllForPost(postId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by id' })
  @ApiResponse({ status: 200, description: 'Return found comment.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    const comment = await this.commentsService.findOne(id);
    
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    
    if (comment.author.id !== user.id) {
      throw new ForbiddenException('You can only update your own comments');
    }
    
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    const comment = await this.commentsService.findOne(id);
    
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    
    if (comment.author.id !== user.id) {
      throw new ForbiddenException('You can only delete your own comments');
    }
    
    return this.commentsService.remove(id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Like a comment' })
  @ApiResponse({ status: 200, description: 'Comment liked successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiBearerAuth()
  likeComment(@Param('id') id: string, @CurrentUser() user: User) {
    return this.commentsService.likeComment(id, user);
  }

  @Delete(':id/like')
  @ApiOperation({ summary: 'Unlike a comment' })
  @ApiResponse({ status: 200, description: 'Comment unliked successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiBearerAuth()
  unlikeComment(@Param('id') id: string, @CurrentUser() user: User) {
    return this.commentsService.unlikeComment(id, user);
  }
}