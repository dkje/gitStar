import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Observable } from "./Observable";
import { UserCollection } from "./UserCollection";

export interface UserProps {
  login: string;
  avatar_url: string;
  id: string;
}

// 검색한 User를 저장하는 용도의 Model
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(new Attributes<UserProps>(attrs), new Observable());
  }

  static UserCollectionInstance: null | UserCollection = null;

  // UserCollection은 buildUserCollection을 통해서만 생성한다.
  static buildUserCollection(): UserCollection {
    if (this.UserCollectionInstance) return this.UserCollectionInstance;

    this.UserCollectionInstance = new UserCollection((user: UserProps) =>
      User.buildUser(user)
    );
    return this.UserCollectionInstance;
  }
}
