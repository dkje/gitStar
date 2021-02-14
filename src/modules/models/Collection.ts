import { Sort } from "../utils/Sort";
import { Model } from "./Model";
import { Observable } from "./Observable";

// 일반 객체를 인스턴스로 병렬화하는 헬퍼메소드
export type Desirialize<Model, ModelProps> = (user: ModelProps) => Model;

interface HasId {
  id: string;
}

//여러 모델 그룹을 통합 관리하기 위한 클래스
export abstract class Collection<T extends Model<K>, K extends HasId> {
  #models: T[] = [];
  #observable: Observable = new Observable();

  constructor(public deserialize: Desirialize<T, K>) {}
  on = this.#observable.on;
  trigger = this.#observable.trigger;
  models = this.#models;
}
