import { BookmarkCollection } from "../models/BookmarkCollection";
import { UserProps } from "../models/User";
import { SearchBarView } from "../views/SearchBarView";
import { UserListView } from "../views/UserListView";
import { Component } from "./Component";
import { Menu } from "./states/Menu";
import { UserListItemCollection } from "./states/UserListItemCollection";

// 부모 컴포넌트에서 전달받을 state의 인터페이스
export interface UserListProps {
  userList: UserListItemCollection | BookmarkCollection;
  onSearch?: (value: string) => void;
  bookmarkMenu: Menu;
  onMenuClick: (user: UserProps) => void;
}

// 검색 결과 리스트 View를 관리하는 컴포넌트
export class UserList implements Component {
  constructor(private states: UserListProps) {}
  #searchValue = "";

  // 유저 검색 창의 View 인스턴스
  #searchBar = new SearchBarView(
    document.querySelector(".search-bar")!,
    this.states.bookmarkMenu,
    {
      onSearch: (value: string) => {
        this.#list.appendSpinner();
        this.#searchValue = value;
        if (this.states.onSearch) {
          // 부모에게서 전달받은 onSearch가 있다면
          // 해당 함수를 view 이벤트에 bind한다
          return this.states.onSearch(value);
        }
        // 전달받은 onSearch가 없다면
        // collection을 filter하는 자체 Search 메소드를 사용한다
        this.#onSearch(value);
      },
    }
  );

  // 검색 결과 리스트 View의 인스턴스
  #list = new UserListView(
    document.querySelector(".user-list--container")!,
    this.states.userList,
    "login",
    {
      onBookmarkClick: this.states.onMenuClick,
    }
  );

  // 부모로부터 onSearch를 전달받지 못했다면
  // list의 collection filter 기능을 사용한다
  #onSearch = (filterKey: string) => {
    this.#list.render(filterKey);
  };

  render() {
    this.#searchBar.render();
    this.#list.render(this.#searchValue);
  }
}
