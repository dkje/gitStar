interface ModelAttributes<T> {
  set(value: Partial<T>): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}
interface Observable {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id: string;
}

// data를 저장하는 용도의 Model 클래스
// attribute 기능과 observable 기능을 위임해 갖는다
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private observable: Observable
  ) {}

  on = this.observable.on;
  trigger = this.observable.trigger;
  get = this.attributes.get;
  getAll = this.attributes.getAll;

  // attribete 업데이트가 일어났을 경우 observer에 알린다
  set(update: Partial<T>): void {
    this.attributes.set(update);
    this.observable.trigger("change");
  }
}
