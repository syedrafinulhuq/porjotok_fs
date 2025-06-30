import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDate, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PrivacyLevel } from '../entities/post.entity';

export class CreatePostDto {
  @ApiProperty({ example: 'My amazing trip to Bali' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ enum: PrivacyLevel, default: PrivacyLevel.PUBLIC, required: false })
  @IsEnum(PrivacyLevel)
  @IsOptional()
  privacyLevel?: PrivacyLevel;

  @ApiProperty({ example: ['travel', 'bali', 'vacation'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  hashtags?: string[];

  @ApiProperty({ example: '2023-05-30T15:30:00Z', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  scheduledFor?: Date;
}