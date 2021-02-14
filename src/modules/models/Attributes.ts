// 객체의 속성과 관련된 기능
// 인자로 전달받은 객체를 data로 저장한다
export class Attributes<T> {
  constructor(private data: T) {}

  // data 중 key에 해당하는 value를 반환한다
  get = <K extends keyof T>(key: K) => {
    return this.data[key];
  };

  // data를 모두 반환한다
  getAll = (): T => {
    return this.data;
  };

  // 인자로 전달받은 속성으로 data를 갱신한다
  set = (update: Partial<T>): void => {
    Object.assign(this.data, update);
  };
}
