import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
export declare enum FriendRequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}
export declare class FriendRequest extends BaseEntity {
    sender: User;
    receiver: User;
    status: FriendRequestStatus;
}
