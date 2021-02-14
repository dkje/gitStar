import { ApiSync } from "../sync/ApiSync";
import { KorFirstSort } from "../utils/KorFirstSort";
import { Sort } from "../utils/Sort";
import { Collection } from "./Collection";
import { User, UserProps } from "./User";
const rootUrl = "http://api.github.com/search/users?per_page=100&q=";

//User Model을 Collectio으로 관리하기 위한 클래스
export class UserCollection extends Collection<User, UserProps> {
  #sync = new ApiSync<User>(rootUrl); // api sync 기능을 갖는다
  #sorter: Sort = new KorFirstSort("login"); // 한국어 우선 정렬 기능을 갖는다

  get sort() {
    return () => {
      this.#sorter.sort(this.models);
    };
  }

  // 유저 검색을 통해 새로운 user model들이 저장되었다면 observer에 알린다
  searchUser = async (username: string) => {
    const response = await this.#sync.get(username + "+in:user");
    const data = await response.data;
    this.models = data.items.map((user: UserProps) => this.deserialize(user));
    this.sort();
    this.trigger("update");
  };
}
