import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    createAdmin(user: User, createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    getProfile(user: User): Promise<UserResponseDto>;
    findOne(id: string): Promise<UserResponseDto>;
    updateProfile(user: User, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    requestDeletion(user: User): Promise<void>;
}
