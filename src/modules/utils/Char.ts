export enum CharType {
  Kor,
  Eng,
  Etc,
}

// 글자의 언어 타입과 아스키 코드를 관리하기 위한 class
export class Char {
  #type: CharType;
  #code: number;
  constructor(private value: string) {
    if (value.length > 1) throw Error("only one char can be used");
    this.#code = value.toUpperCase().charCodeAt(0);
    this.#type = this.getType();
  }

  get type() {
    return this.#type;
  }

  get code() {
    return this.#code;
  }

  // 정렬에 사용될 언어 타입이 추가 될 시 수정 될 부분
  private getType(): CharType {
    if (this.isEng()) return CharType.Eng;
    if (this.isKor()) return CharType.Kor;
    return CharType.Etc;
  }

  private isEng() {
    return 65 <= this.#code && this.#code <= 122;
  }

  private isKor() {
    return (
      (44032 <= this.#code && this.#code <= 55203) ||
      (12593 <= this.#code && this.#code <= 12643)
    );
  }
}
