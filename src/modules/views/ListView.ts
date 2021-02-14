import { Collection } from "../models/Collection";
import { Model } from "../models/Model";
import { getInitialChar } from "../utils/getInitialChar";
import { ListCategory } from "./ListCategoryView";
import { NoResultView } from "./NoResultView";
import { Spinner } from "./SpinnerView";

interface Events {
  onBookmarkClick: (value: any) => void;
}

interface HasId {
  id: string;
}

// Collection을 기반으로 리스트를 렌더하기 위한 클래스
export abstract class ListView<T extends Model<K>, K extends HasId> {
  #spinner = new Spinner(this.parent);
  #noResultItem = new NoResultView(this.parent);
  constructor(
    public parent: Element,
    public list: Collection<T, K>, // view에 bind할 collection을 받는다
    public filterKey: keyof K, // collection을 filter하기 위한 attribute 키를 받는다
    public events?: Events
  ) {}

  // List의 Item으로 사용할 View를 연결한다
  abstract renderItem(model: T, itemParent: Element, events?: Events): void;
  appendSpinner = this.#spinner.render;
  appendNoResultItem = this.#noResultItem.render;

  // 리스트에 아이템을 렌더한다
  render(filter?: string): void {
    this.clearParent();

    const ul = document.createElement("ul");
    let headerChar = "";

    for (let model of this.list.models) {
      if (this.isModelFiltered(model, filter)) continue;

      const currentInitialChar = this.getInitialChar(model);
      if (headerChar !== currentInitialChar)
        this.appendCategory(ul, currentInitialChar);

      const itemParent = document.createElement("li");
      this.renderItem(model, itemParent, this.events);
      ul.append(itemParent);

      headerChar = currentInitialChar;
    }

    if (ul.childNodes.length) return this.parent.append(ul);
    this.appendNoResultItem();
  }

  clearParent() {
    this.parent.innerHTML = "";
  }

  // model attributes의 filterKey를 기준으로 filter 여부를 반환한다
  isModelFiltered(model: T, filter?: string) {
    return (
      filter &&
      !String(model.get(this.filterKey))
        .toUpperCase()
        .includes(filter.toUpperCase())
    );
  }

  // model attributes의 filterKey를 기준으로 초성을 반환한다
  getInitialChar(model: T) {
    return getInitialChar(String(model.get(this.filterKey))).toUpperCase();
  }

  appendCategory = (ul: HTMLUListElement, char: string) => {
    const category = new ListCategory(ul);
    category.render();
    category.appendCategoryText(char);
  };
}
