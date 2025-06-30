import { IsString, IsOptional, IsEnum, IsDate, IsArray, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PrivacyLevel } from '../entities/post.entity';

export class UpdatePostDto {
  @ApiProperty({ example: 'Updated trip details', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'Ubud, Dhaka, Bangladesh', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ enum: PrivacyLevel, required: false })
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

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  commentsCount?: number;
}