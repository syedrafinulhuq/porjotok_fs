import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Rafi.Nul@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'rafinulhuq' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'rafi1234' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Rafi' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Nul' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Travel enthusiast and photographer', required: false })
  @IsString()
  @IsOptional()
  bio?: string;
}