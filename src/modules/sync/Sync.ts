// Api Sync 또는 LocalStorage Sync의 통합 인터페이스
export interface Sync<T> {
  save(data: T): void;
  deleteById(id: string): void;
}
