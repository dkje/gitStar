import { Model } from "../../models/Model";
import { Attributes } from "../../models/Attributes";
import { Observable } from "../../models/Observable";

export interface BookmarkMenuProps {
  id: string;
  isUserMenu: boolean;
}

// 북마크 리스트 컴포넌트와 View에게 전달 될 states
export class Menu extends Model<BookmarkMenuProps> {
  static buildMenu(attrs: BookmarkMenuProps): Menu {
    return new Menu(new Attributes<BookmarkMenuProps>(attrs), new Observable());
  }

  // state 변경 시 observer에게 알린다
  toggleBookmarkMenu = () => {
    this.set({ isUserMenu: !this.get("isUserMenu") });
    this.trigger("update");
  };
}
