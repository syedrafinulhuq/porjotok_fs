import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { FriendRequest, FriendRequestStatus } from './entities/friend-request.entity';
import { UsersService } from '../users/users.service';
export declare class FriendsService {
    private readonly friendRequestRepository;
    private readonly userRepository;
    private readonly usersService;
    constructor(friendRequestRepository: Repository<FriendRequest>, userRepository: Repository<User>, usersService: UsersService);
    sendFriendRequest(senderId: string, receiverId: string): Promise<FriendRequest>;
    getFriendRequestById(requestId: string): Promise<FriendRequest>;
    respondToFriendRequest(requestId: string, status: FriendRequestStatus): Promise<FriendRequest>;
    getFriendRequests(userId: string): Promise<{
        sent: FriendRequest[];
        received: FriendRequest[];
    }>;
    getFriends(userId: string): Promise<User[]>;
    getFriendIds(userId: string): Promise<string[]>;
    areUsersFriends(user1Id: string, user2Id: string): Promise<boolean>;
    removeFriend(userId: string, friendId: string): Promise<void>;
    getFriendSuggestions(userId: string): Promise<User[]>;
}
