import { Menu, BookmarkMenuProps } from "../components/states/Menu";
import { View } from "./View";

interface Events {
  onSearch: (value: string) => void;
}

// 검색 바를 렌더하기 위한 View
export class SearchBarView extends View<Menu, BookmarkMenuProps> {
  constructor(parent: Element, states: Menu, private events: Events) {
    super(parent, states);
  }

  #lastSearchInput = "";
  #isTrottling: boolean = false;

  // submit 이벤트 발생 시 검색 함수를 바인드한다
  eventsMap(): Record<string, (e: Event) => void> {
    return {
      "submit:form": (e) => {
        e.preventDefault();
        if (!this.#lastSearchInput) return;
        if (this.#isTrottling) return;

        this.#isTrottling = true;
        this.events.onSearch(this.#lastSearchInput);
        setTimeout(() => {
          this.#isTrottling = false;
        }, 1000);
      },
      "input:#search-input": (e) => {
        const input = e.target as HTMLInputElement;
        this.#lastSearchInput = input.value;
      },
    };
  }

  // 검색 창 템플릿을 반환한다
  template() {
    const form = document.querySelector<HTMLTemplateElement>(
      "#search-bar--temp"
    );
    if (!form) throw Error("no search-bar template");
    const copiedTopBar = form?.content.cloneNode(true) as HTMLFormElement;
    const input = copiedTopBar.querySelector("input");
    if (input) input.value = this.#lastSearchInput;
    return copiedTopBar;
  }
}
