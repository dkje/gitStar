import { Model } from "../models/Model";

interface hasId {
  id: string;
}

// View의 부모 클래스
// Components에서 전달받을 states를 generic으로 갖는다
export abstract class View<
  T extends Model<ModelProps>,
  ModelProps extends hasId
> {
  // dom을 render할 parent Element와
  // dom을 render하기 위해 필요한 data인 states를 인자로 받는다
  constructor(public parent: Element, public states?: T) {}

  // parent에게 붙일 dom을 반환한다
  abstract template(): HTMLElement;

  // template으로 생성된 dom에 bind할 events들
  eventsMap(): Record<string, (e: Event) => void> {
    return {};
  }

  clearParent() {
    this.parent.innerHTML = "";
  }

  // template으로 생성된 dom에 event를 bind한다
  bindEvents(parents: HTMLElement): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      parents.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  // render와 관련된 하위 메소드들을 순차적으로 실행한다
  render = (): void => {
    this.clearParent();
    const templateElement = this.template();
    this.bindEvents(templateElement);
    this.parent.append(templateElement);
  };
}
