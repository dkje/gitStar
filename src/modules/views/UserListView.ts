import { Model } from "../models/Model";
import { ListView } from "./ListView";
import { UserItemView } from "./UserItemView";

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

// 검색 결과 리스트를 렌더하는 View
export class UserListView<
  T extends Model<K>,
  K extends ListItem
> extends ListView<T, K> {
  // 리스트의 아이템으로 사용할 View를 연결한다
  renderItem(model: T, itemParent: Element, events: Events): void {
    new UserItemView(itemParent, model, events).render();
  }
}
