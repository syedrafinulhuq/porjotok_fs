import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ example: 'https://google.com/photos/beach.jpg' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'Beautiful Dhaka', required: false })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: { lat: 123.456, lng: 78.90 }, required: false })
  @IsObject()
  @IsOptional()
  geoLocation?: Record<string, any>;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsString()
  @IsOptional()
  postId?: string;
}