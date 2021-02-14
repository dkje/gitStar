import { Char, CharType } from "./Char";

type compareReturn = 1 | -1 | 0;

// priority를 기반으로 string을 비교하는 class
export class CompareStr {
  // 언어 정렬 순서를 정하는 속성
  // ex: [CharType.Kor, CharType.Eng, CharType.Etc]
  // => 한글,영어,그 외 순으로 정렬한다
  constructor(private priority: CharType[]) {}

  compare = (a: string, b: string): compareReturn => {
    let i = 0;
    const aLength = a.length;
    const bLength = b.length;
    let compareResult;

    while (i < aLength && i < bLength) {
      const aChar = new Char(a[i]);
      const bChar = new Char(b[i]);

      const aPriority = this.getPriority(aChar);
      const bPriority = this.getPriority(bChar);

      if (aPriority === bPriority) {
        // code를 기준으로 우선 순위 비교
        compareResult = this.compareWithCode(aChar, bChar);
      } else {
        // priority를 기준으로 우선 순위 비교
        compareResult = this.compareWithPriority(aPriority, bPriority);
      }

      i++;
      if (!compareResult) continue;
      return compareResult;
    }

    // 두 문장의 앞머리가 같은 경우 길이가 더 짧은 쪽에 높은 우선순위를 부여함
    // ex:) 가나다 > 가나다라마
    return this.compareWithLength(a, b);
  };

  getPriority = (char: Char): number => {
    return this.priority.indexOf(char.type);
  };

  compareWithCode = (a: Char, b: Char): compareReturn => {
    if (a.code < b.code) return -1;
    if (a.code > b.code) return 1;
    return 0;
  };

  compareWithPriority = (
    aPriority: number,
    bPriority: number
  ): compareReturn => {
    if (aPriority < bPriority) return -1;
    if (aPriority > bPriority) return 1;
    return 0;
  };

  compareWithLength = (a: string, b: string): compareReturn => {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;
    return 0;
  };
}
