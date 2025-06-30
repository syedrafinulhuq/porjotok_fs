import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Post as PostEntity } from './entities/post.entity';

@ApiTags('posts')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts (with optional filters)' })
  @ApiResponse({ status: 200, description: 'Return filtered posts.' })
  @ApiQuery({ name: 'hashtag', required: false, description: 'Filter by hashtag' })
  @ApiQuery({ name: 'location', required: false, description: 'Filter by location' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  @ApiBearerAuth()
  findAll(
    @Query('hashtag') hashtag?: string,
    @Query('location') location?: string,
    @Query('userId') userId?: string,
    @CurrentUser() user?: User,
  ) {
    return this.postsService.findAll({ hashtag, location, userId }, user);
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get user feed (posts from followed users)' })
  @ApiResponse({ status: 200, description: 'Return user feed.' })
  @ApiBearerAuth()
  getFeed(@CurrentUser() user: User) {
    return this.postsService.getFeed(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, description: 'Return found post.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    const post = await this.postsService.findOne(id, user);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    const post = await this.postsService.findOne(id, user);
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    if (post.author.id !== user.id) {
      throw new ForbiddenException('You can only update your own posts');
    }
    
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    const post = await this.postsService.findOne(id, user);
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    if (post.author.id !== user.id) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    
    return this.postsService.remove(id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({ status: 200, description: 'Post liked successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBearerAuth()
  likePost(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postsService.likePost(id, user);
  }

  @Delete(':id/like')
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({ status: 200, description: 'Post unliked successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBearerAuth()
  unlikePost(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postsService.unlikePost(id, user);
  }
}