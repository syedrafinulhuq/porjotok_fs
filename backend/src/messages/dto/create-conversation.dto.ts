import { IsArray, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({ example: 'Trip planning', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: true, default: false, required: false })
  @IsBoolean()
  @IsOptional()
  isGroupChat?: boolean = false;

  @ApiProperty({ example: ['123e4567-e89b-12d3-a456-426614174000'] })
  @IsArray()
  @IsUUID(4, { each: true })
  participantIds: string[];
}