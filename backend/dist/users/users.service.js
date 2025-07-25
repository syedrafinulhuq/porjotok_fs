"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto, isAdmin = false) {
        const { email, username, password } = createUserDto;
        const existingUser = await this.usersRepository.findOne({
            where: [{ email }, { username }],
        });
        if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'username';
            throw new common_1.ConflictException(`User with this ${field} already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword, role: isAdmin ? user_entity_1.UserRole.ADMIN : user_entity_1.UserRole.USER }));
        return this.usersRepository.save(user);
    }
    async createAdminUser(createUserDto) {
        return this.create(createUserDto, true);
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findByUsername(username) {
        return this.usersRepository.findOne({ where: { username } });
    }
    async update(id, updateUserDto, currentUser) {
        const user = await this.findOne(id);
        if (updateUserDto.role && (!currentUser || !currentUser.isAdmin())) {
            throw new common_1.UnauthorizedException('Only admins can change user roles');
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }
    async requestDeletion(id) {
        const user = await this.findOne(id);
        user.isActive = false;
        await this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.softRemove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map