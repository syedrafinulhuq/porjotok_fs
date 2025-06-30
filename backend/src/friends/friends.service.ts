import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FriendRequest, FriendRequestStatus } from './entities/friend-request.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async sendFriendRequest(senderId: string, receiverId: string): Promise<FriendRequest> {

    const sender = await this.usersService.findOne(senderId);
    const receiver = await this.usersService.findOne(receiverId);
    
    if (!sender || !receiver) {
      throw new NotFoundException('User not found');
    }
    
  
    const areFriends = await this.areUsersFriends(senderId, receiverId);
    
    if (areFriends) {
      throw new ConflictException('Users are already friends');
    }
    
    
    const existingRequest = await this.friendRequestRepository.findOne({
      where: [
        { sender: { id: senderId }, receiver: { id: receiverId }, status: FriendRequestStatus.PENDING },
        { sender: { id: receiverId }, receiver: { id: senderId }, status: FriendRequestStatus.PENDING },
      ],
    });
    
    if (existingRequest) {
      throw new ConflictException('A friend request already exists between these users');
    }
    
    // Create the friend request
    const friendRequest = this.friendRequestRepository.create({
      sender,
      receiver,
      status: FriendRequestStatus.PENDING,
    });
    
    return this.friendRequestRepository.save(friendRequest);
  }

  async getFriendRequestById(requestId: string): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne({
      where: { id: requestId },
      relations: ['sender', 'receiver'],
    });
  }

  async respondToFriendRequest(requestId: string, status: FriendRequestStatus): Promise<FriendRequest> {
    const request = await this.getFriendRequestById(requestId);
    
    if (!request) {
      throw new NotFoundException(`Friend request with ID ${requestId} not found`);
    }
    
    request.status = status;
    return this.friendRequestRepository.save(request);
  }

  async getFriendRequests(userId: string): Promise<{ sent: FriendRequest[]; received: FriendRequest[] }> {
    const sent = await this.friendRequestRepository.find({
      where: { sender: { id: userId }, status: FriendRequestStatus.PENDING },
      relations: ['receiver'],
    });
    
    const received = await this.friendRequestRepository.find({
      where: { receiver: { id: userId }, status: FriendRequestStatus.PENDING },
      relations: ['sender'],
    });
    
    return { sent, received };
  }

  async getFriends(userId: string): Promise<User[]> {
    // Find accepted requests where the user is either sender or receiver
    const acceptedRequests = await this.friendRequestRepository.find({
      where: [
        { sender: { id: userId }, status: FriendRequestStatus.ACCEPTED },
        { receiver: { id: userId }, status: FriendRequestStatus.ACCEPTED },
      ],
      relations: ['sender', 'receiver'],
    });
    
    // Extract friends
    return acceptedRequests.map(request => {
      return request.sender.id === userId ? request.receiver : request.sender;
    });
  }

  async getFriendIds(userId: string): Promise<string[]> {
    const friends = await this.getFriends(userId);
    return friends.map(friend => friend.id);
  }

  async areUsersFriends(user1Id: string, user2Id: string): Promise<boolean> {
    const request = await this.friendRequestRepository.findOne({
      where: [
        { sender: { id: user1Id }, receiver: { id: user2Id }, status: FriendRequestStatus.ACCEPTED },
        { sender: { id: user2Id }, receiver: { id: user1Id }, status: FriendRequestStatus.ACCEPTED },
      ],
    });
    
    return !!request;
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    // Find the friend request
    const friendRequest = await this.friendRequestRepository.findOne({
      where: [
        { sender: { id: userId }, receiver: { id: friendId }, status: FriendRequestStatus.ACCEPTED },
        { sender: { id: friendId }, receiver: { id: userId }, status: FriendRequestStatus.ACCEPTED },
      ],
    });
    
    if (!friendRequest) {
      throw new NotFoundException('Friend relationship not found');
    }
    
    // Remove the friend request
    await this.friendRequestRepository.remove(friendRequest);
  }

  async getFriendSuggestions(userId: string): Promise<User[]> {
    // Get current friends
    const friends = await this.getFriends(userId);
    const friendIds = friends.map(friend => friend.id);
    
    // Get users who are not friends
    const suggestions = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id != :userId', { userId })
      .andWhere('user.id NOT IN (:...friendIds)', { friendIds: friendIds.length ? friendIds : ['no-friends'] })
      .limit(10)
      .getMany();
    
    return suggestions;
  }
}