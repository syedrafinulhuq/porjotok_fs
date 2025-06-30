import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('photos')
@UseGuards(JwtAuthGuard)
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new photo' })
  @ApiResponse({ status: 201, description: 'Photo created successfully.' })
  @ApiBearerAuth()
  create(@Body() createPhotoDto: CreatePhotoDto, @CurrentUser() user: User) {
    return this.photosService.create(createPhotoDto, user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a photo' })
  @ApiResponse({ status: 201, description: 'Photo uploaded successfully.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        caption: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
        postId: {
          type: 'string',
        },
      },
    },
  })
  @ApiBearerAuth()
  uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: Partial<CreatePhotoDto>,
    @CurrentUser() user: User,
  ) {
    // In a real app, we would upload the file to a storage service
    // and then store the URL in the database
    const url = `https://example.com/photos/${file.originalname}`;
    
    return this.photosService.create({
      ...createPhotoDto,
      url,
    }, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all photos' })
  @ApiResponse({ status: 200, description: 'Return all photos.' })
  @ApiBearerAuth()
  findAll(@CurrentUser() user: User) {
    return this.photosService.findAll(user);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get photos by user' })
  @ApiResponse({ status: 200, description: 'Return photos by user.' })
  @ApiBearerAuth()
  findByUser(@Param('userId') userId: string, @CurrentUser() user: User) {
    return this.photosService.findByUser(userId, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a photo by id' })
  @ApiResponse({ status: 200, description: 'Return found photo.' })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.photosService.findOne(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a photo' })
  @ApiResponse({ status: 200, description: 'Photo deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden resource.' })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    const photo = await this.photosService.findOne(id, user);
    
    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    
    if (photo.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own photos');
    }
    
    return this.photosService.remove(id);
  }
}