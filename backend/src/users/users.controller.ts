import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Public user registration
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserResponseDto(user);
  }

  // Admin creation endpoint (protected)
  @UseGuards(JwtAuthGuard)
  @Post('create-admin')
  @ApiOperation({ summary: 'Create a new admin user (admin only)' })
  @ApiResponse({ status: 201, description: 'Admin user created successfully.', type: UserResponseDto })
  @ApiBearerAuth()
  async createAdmin(
    @CurrentUser() user: User,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    if (!user.isAdmin()) {
      throw new UnauthorizedException('Only admins can create admin users');
    }

    const adminUser = await this.usersService.createAdminUser(createUserDto);
    return new UserResponseDto(adminUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [UserResponseDto] })
  @ApiBearerAuth()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => new UserResponseDto(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return current user.', type: UserResponseDto })
  @ApiBearerAuth()
  async getProfile(@CurrentUser() user: User): Promise<UserResponseDto> {
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return found user.', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'User updated successfully.', type: UserResponseDto })
  @ApiBearerAuth()
  async updateProfile(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.usersService.update(user.id, updateUserDto, user);
    return new UserResponseDto(updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Request account deletion' })
  @ApiResponse({ status: 204, description: 'Deletion request successful.' })
  @ApiBearerAuth()
  async requestDeletion(@CurrentUser() user: User): Promise<void> {
    await this.usersService.requestDeletion(user.id);
  }
}
