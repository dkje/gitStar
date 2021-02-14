import { Model } from "../../models/Model";
import { Attributes } from "../../models/Attributes";
import { Observable } from "../../models/Observable";
import { UserListItemCollection } from "./UserListItemCollection";
import { UserCollection } from "../../models/UserCollection";
import { BookmarkCollection } from "../../models/BookmarkCollection";
import { User } from "../../models/User";
import { Bookmark } from "../../models/Bookmark";

export interface UserListItemProps {
  login?: string;
  avatar_url?: string;
  id: string;
  bookmarked: boolean;
}

// 유저 리스트 컴포넌트와 View에게 전달될 states
export class UserListItem extends Model<UserListItemProps> {
  static buildUserListItem(attrs: UserListItemProps): UserListItem {
    return new UserListItem(
      new Attributes<UserListItemProps>(attrs),
      new Observable()
    );
  }

  static UserCollectionInstance: null | UserListItemCollection = null;

  static buildUserListItemCollection(): UserListItemCollection {
    if (this.UserCollectionInstance) return this.UserCollectionInstance;
    const users = User.buildUserCollection();
    const bookmark = Bookmark.buildBookmarkCollection();

    this.UserCollectionInstance = new UserListItemCollection(
      (user: UserListItemProps) => UserListItem.buildUserListItem(user),
      users,
      bookmark
    );

    users.on("update", this.UserCollectionInstance.update);
    bookmark.on("update", this.UserCollectionInstance.update);
    return this.UserCollectionInstance;
  }
}
