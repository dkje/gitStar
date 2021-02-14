import { Model } from "../models/Model";
import { View } from "./View";

// components로부터 전달받을 state 인터페이스
interface Events {
  onBookmarkClick: (user: ListItem) => void;
}

interface ListItem {
  login?: string;
  avatar_url?: string;
  id: string;
  bookmarked: boolean;
}

// 검색 후 리스트에 표시될 아이템 1개를 렌더하는 View
export class UserItemView<T extends Model<K>, K extends ListItem> extends View<
  T,
  K
> {
  constructor(parent: Element, states: T, private events: Events) {
    super(parent, states);
  }

  // states 변경 함수를 star 버튼에 bind한다
  eventsMap(): Record<string, (e: Event) => void> {
    return {
      "click:.user-list__bookmark": (e: Event) => {
        e.preventDefault();
        this.events.onBookmarkClick(this.states!.getAll());
      },
    };
  }

  // state의 정보를 기반으로 template을 생성한다
  template() {
    const temp = document.querySelector<HTMLTemplateElement>(
      "#user-list--temp"
    );
    if (!temp) throw Error("No user list template");

    const copiedList = temp.content.cloneNode(true) as HTMLUListElement;
    const item = copiedList
      .querySelector("div")!
      .cloneNode(true) as HTMLDivElement;

    if (!item) throw Error("No user list item");

    item.classList.add("user-list__item");

    const avatarDiv = item.querySelector<HTMLDivElement>(".user-list__avatar");
    avatarDiv!.style.backgroundImage = `url("${this.states!.get(
      "avatar_url"
    )}")`;

    const userName = item.querySelector<HTMLDivElement>(".user-list__name");
    userName!.textContent = String(this.states!.get("login"));

    const userBookmark = item.querySelector(".user-list__bookmark");
    if (this.states!.get("bookmarked")) {
      userBookmark?.classList.add("on-star");
    }

    return item;
  }
}
