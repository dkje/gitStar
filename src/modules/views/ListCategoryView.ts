import { View } from "./View";

// 정렬된 리스트의 초성을 카테고리로 렌더하기 위한 뷰
export class ListCategory extends View<never, never> {
  #charCategory: HTMLElement | null = null;
  appendCategoryText = (char: string) => {
    if (!this.#charCategory) return;
    this.#charCategory.textContent = char;
  };

  template = () => {
    this.#charCategory = document.createElement("div");
    this.#charCategory.classList.add("user-item--header");
    return this.#charCategory;
  };

  render = (): void => {
    const templateElement = this.template();
    this.bindEvents(templateElement);
    this.parent.append(templateElement);
  };
}
