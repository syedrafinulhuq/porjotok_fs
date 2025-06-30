import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User, UserRole } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}



  async create(createUserDto: CreateUserDto, isAdmin = false): Promise<User> {
    const { email, username, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      throw new ConflictException(`User with this ${field} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: isAdmin ? UserRole.ADMIN : UserRole.USER,
    });

    return this.usersRepository.save(user);
  }



  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    return this.create(createUserDto, true);
  }



  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }



  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }



  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }



  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }



  async update(id: string, updateUserDto: UpdateUserDto, currentUser?: User): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.role && (!currentUser || !currentUser.isAdmin())) {
      throw new UnauthorizedException('Only admins can change user roles');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }



  async requestDeletion(id: string): Promise<void> {
    const user = await this.findOne(id);

    user.isActive = false;

    await this.usersRepository.save(user);
  }



  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.usersRepository.softRemove(user);
  }
}
