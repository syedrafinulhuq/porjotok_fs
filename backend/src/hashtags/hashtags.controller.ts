import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HashtagsService } from './hashtags.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('hashtags')
@UseGuards(JwtAuthGuard)
@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hashtags' })
  @ApiResponse({ status: 200, description: 'Return all hashtags.' })
  @ApiQuery({ name: 'trending', required: false, type: Boolean, description: 'Get trending hashtags' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit the number of results' })
  @ApiBearerAuth()
  findAll(
    @Query('trending') trending?: boolean,
    @Query('limit') limit?: number,
  ) {
    return this.hashtagsService.findAll(trending, limit);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get a hashtag by name' })
  @ApiResponse({ status: 200, description: 'Return found hashtag.' })
  @ApiResponse({ status: 404, description: 'Hashtag not found.' })
  @ApiBearerAuth()
  findOne(@Param('name') name: string) {
    return this.hashtagsService.findOne(name);
  }
}