import { Menu, BookmarkMenuProps } from "../components/states/Menu";
import { View } from "./View";

// 탑 메뉴를 렌더하기 위한 View
export class TopBarView extends View<Menu, BookmarkMenuProps> {
  // 탑 메뉴버튼을 click 이벤트에 state 변경 함수를 bind한다
  eventsMap(): { [key: string]: (e: Event) => void } {
    return {
      "click:.top--btn": () => {
        this.states!.toggleBookmarkMenu();
      },
    };
  }

  // 탑 메뉴 템플릿을 반환한다
  template() {
    const topbar = document.querySelector<HTMLTemplateElement>(
      "#top-bar--temp"
    );
    if (!topbar) throw Error("no search-bar template");
    const copiedTopBar = topbar?.content.cloneNode(true) as HTMLFormElement;
    if (this.states!.get("isUserMenu")) {
      copiedTopBar.querySelector(".user-btn")?.classList.add("top-btn__on");
    } else {
      copiedTopBar.querySelector(".bookmark-btn")?.classList.add("top-btn__on");
    }
    return copiedTopBar;
  }
}
