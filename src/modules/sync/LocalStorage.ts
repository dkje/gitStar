import { Sync } from "./Sync";

interface HasId {
  id: string;
}

// 로컬 스토리지의 데이터와 관련된 행동 클래스
export default class LocalStorage<T extends HasId> implements Sync<T> {
  constructor(public key: string) {}
  // 인스턴스 생성시 전달받은 key를 기준으로 localstorage의 데이터를 관리한다

  get(): string | null {
    return localStorage.getItem(this.key);
  }

  save(data: T): void {
    const originalData = this.get();
    let newData: T[] = (originalData && JSON.parse(originalData)) || [];

    if (newData.findIndex((el) => el.id === data.id) >= 0) return;

    newData.push(data);

    const serializedData = JSON.stringify(newData);
    localStorage.setItem(this.key, serializedData);
  }

  deleteById(id: string): void {
    const originalData = this.get();
    let datas: T[] = (originalData && JSON.parse(originalData)) || [];

    const newData = datas.filter((el) => el.id !== id);
    if (newData.length === datas.length) return;

    const serializedData = JSON.stringify(newData);
    localStorage.setItem(this.key, serializedData);
  }

  deleteAll() {
    localStorage.removeItem(this.key);
  }
}
