import { Char, CharType } from "../Char";

describe("Char", () => {
  it("can generated with first letter of value", () => {
    expect(() => new Char("asdas")).toThrowError();
    expect(() => new Char("f")).not.toThrowError();
  });

  it("can get ascii code of the capitalized value", () => {
    const char = new Char("a");
    expect(char.code).not.toEqual("a".charCodeAt(0));
    expect(char.code).toEqual("A".charCodeAt(0));
  });

  it("can get value's Language type", () => {
    let kor = new Char("ㄱ");
    expect(kor.type).toEqual(CharType.Kor);
    kor = new Char("라");
    expect(kor.type).toEqual(CharType.Kor);
    kor = new Char("ㅏ");
    expect(kor.type).toEqual(CharType.Kor);

    let eng = new Char("a");
    expect(eng.type).toEqual(CharType.Eng);
    eng = new Char("Z");
    expect(eng.type).toEqual(CharType.Eng);

    let etc = new Char("#");
    expect(etc.type).toEqual(CharType.Etc);
    etc = new Char("1");
    expect(etc.type).toEqual(CharType.Etc);
    etc = new Char(";");
    expect(etc.type).toEqual(CharType.Etc);
  });
});
