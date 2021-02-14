import { Model } from "../models/Model";
import { CharType } from "./Char";
import { CompareStr } from "./CompareStr";
import { Sort } from "./Sort";

type InstanceModel = InstanceType<typeof Model>[];

// Model의 정렬을 위임하는 클래스
export class KorFirstSort implements Sort {
  // 언어 정렬 순서를 정하는 속성
  #priority: CharType[] = [CharType.Kor, CharType.Eng, CharType.Etc];
  #compare = new CompareStr(this.#priority).compare;
  // 정렬의 기준이 될 attribute 속성을 정한다
  constructor(private sortKey: any) {}

  sort(models: InstanceModel) {
    models.sort((a, b) =>
      this.#compare(a.get(this.sortKey), b.get(this.sortKey))
    );
  }
}
