import { FriendsService } from './friends.service';
import { User } from '../users/entities/user.entity';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    getFriends(user: User): Promise<User[]>;
    getFriendRequests(user: User): Promise<{
        sent: import("./entities/friend-request.entity").FriendRequest[];
        received: import("./entities/friend-request.entity").FriendRequest[];
    }>;
    getFriendSuggestions(user: User): Promise<User[]>;
    sendFriendRequest(receiverId: string, user: User): Promise<import("./entities/friend-request.entity").FriendRequest>;
    acceptFriendRequest(requestId: string, user: User): Promise<import("./entities/friend-request.entity").FriendRequest>;
    rejectFriendRequest(requestId: string, user: User): Promise<import("./entities/friend-request.entity").FriendRequest>;
    removeFriend(friendId: string, user: User): Promise<void>;
}
