import { View } from "./View";

// 화면 로딩시 사용할 스피너를 렌더하기 위한 View
export class Spinner extends View<never, never> {
  template() {
    const dummyItem = document.createElement("div");
    dummyItem.classList.add("dummy-item");
    const spinner = document.createElement("div");
    spinner.classList.add("lds-spinner");
    spinner.insertAdjacentHTML(
      "beforeend",
      "<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>"
    );
    dummyItem.append(spinner);
    return dummyItem;
  }
}
