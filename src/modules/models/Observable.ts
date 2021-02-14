type Callback = () => void;
export class Observable {
  #events: { [key: string]: Callback[] } = {};

  // trigger event를 eventName으로 callback을 보관한다
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.#events[eventName] || [];
    handlers.push(callback);
    this.#events[eventName] = handlers;
  };

  // eventName을 key로 갖는 callback을 실행한다
  trigger = (eventName: string) => {
    const handlers = this.#events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach((callback) => {
      callback();
    });
  };

  // on 테스트용 기능
  get eventsLength() {
    return Object.keys(this.#events).length;
  }
}
