import { View } from "./View";

// 검색 결과가 없을 시 대체 dom을 렌더하기 위한 뷰
export class NoResultView extends View<never, never> {
  template() {
    const dummyItem = document.createElement("div");
    dummyItem.classList.add("dummy-item");
    const innerText = document.createElement("div");
    innerText.textContent = "검색 결과가 없습니다.";
    dummyItem.append(innerText);
    return dummyItem;
  }
}
