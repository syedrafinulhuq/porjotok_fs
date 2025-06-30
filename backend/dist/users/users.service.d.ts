import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto, isAdmin?: boolean): Promise<User>;
    createAdminUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, currentUser?: User): Promise<User>;
    requestDeletion(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
