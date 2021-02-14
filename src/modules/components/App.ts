import { Bookmark, BookmarkProps } from "../models/Bookmark";
import { User } from "../models/User";
import { Component } from "./Component";
import { Header } from "./Header";
import { Menu } from "./states/Menu";
import { UserListItem } from "./states/UserListItem";
import { UserList } from "./UserList";

// User와 Bookmark UserListItem Model의 공통 인터페이스
interface UserProps {
  login: string;
  avatar_url: string;
  id: string;
}

// UserList와 Header를 관리하는 부모 Components
export class App implements Component {
  // state와 연관된 model
  #users = User.buildUserCollection();
  #bookmarks = Bookmark.buildBookmarkCollection();
  #userListCollection = UserListItem.buildUserListItemCollection();

  // components 내부에서 관리될 state
  #Menu = Menu.buildMenu({
    id: "",
    isUserMenu: true,
  });

  constructor() {
    this.bind();
  }

  bind = () => {
    //state의 update시 연관된 view를 재렌더한다
    this.#Menu.on("update", this.render);
    this.#userListCollection.on("update", this.renderList);
  };

  // View에서 search와 관련된 event 발생 시 model에게 전달한다
  onUserSearch = (value: string) => {
    this.#users.searchUser(value);
  };

  toggleBookmark(user: UserProps) {
    this.#bookmarks.toggle(user);
  }

  // 부모 컴포넌트 하위에서 관리 될 자식 Components들
  #UserList = new UserList({
    userList: this.#userListCollection,
    onSearch: this.#users.searchUser,
    bookmarkMenu: this.#Menu,
    onMenuClick: (value: UserProps) => {
      this.toggleBookmark(value);
    },
  });

  #BookmarkList = new UserList({
    userList: this.#bookmarks,
    bookmarkMenu: this.#Menu,
    onMenuClick: (value: UserProps) => {
      this.toggleBookmark(value);
    },
  });

  #Header = new Header(this.#Menu);

  // isUserMenu의 상태에 따라 다른 View를 렌더한다
  renderList = () => {
    if (this.#Menu.get("isUserMenu")) {
      this.#UserList.render();
    } else {
      this.#BookmarkList.render();
    }
  };

  // 화면 전체를 렌더한다
  render = () => {
    this.#Header.render();
    this.renderList();
  };
}
