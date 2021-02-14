import { Collection, Desirialize } from "../../models/Collection";
import { UserCollection } from "../../models/UserCollection";
import { BookmarkCollection } from "../../models/BookmarkCollection";
import { UserListItem, UserListItemProps } from "./UserListItem";
import { KorFirstSort } from "../../utils/KorFirstSort";
import { Sort } from "../../utils/Sort";

// UserList 컴포넌트와 View에 전달될 states
export class UserListItemCollection extends Collection<
  UserListItem,
  UserListItemProps
> {
  // userCollection을 bookmarkCollection 기준으로 변형한다
  constructor(
    deserialize: Desirialize<UserListItem, UserListItemProps>,
    private userCollection: UserCollection,
    private bookmarkCollection: BookmarkCollection
  ) {
    super(deserialize);
  }

  // 한국어 우선 정렬 기능을 갖는다
  #sorter: Sort = new KorFirstSort("login");

  update = () => {
    this.map();
    this.sort();
    this.trigger("update");
  };

  // userCollection을 기준으로
  // bookmarkCollection에 존재하는 model이라면
  // bookmarked를 true로 저장한다
  map = () => {
    const newModels = [];
    for (let user of this.userCollection.models) {
      newModels.push(
        UserListItem.buildUserListItem({
          bookmarked: !!this.bookmarkCollection.findById(user.get("id")!),
          id: user.get("id")!,
          avatar_url: user.get("avatar_url"),
          login: user.get("login"),
        })
      );
    }
    this.models = newModels;
  };

  get sort() {
    return () => {
      this.#sorter.sort(this.models);
    };
  }
}
