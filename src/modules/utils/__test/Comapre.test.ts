import { Char, CharType } from "../Char";
import { CompareStr } from "../CompareStr";

describe("CompareString", () => {
  it("getPriority return an index based on a priority array", () => {
    const languagePriority = [CharType.Etc, CharType.Eng, CharType.Kor];
    const compare = new CompareStr(languagePriority);

    const engChar = new Char("a");
    expect(compare.getPriority(engChar)).toEqual(1);
    const korChar = new Char("후");
    expect(compare.getPriority(korChar)).toEqual(2);
    const etcChar = new Char("$");
    expect(compare.getPriority(etcChar)).toEqual(0);
  });

  it("compareWithCode return the priority by comparing uppercase ascii code", () => {
    const languagePriority = [CharType.Etc, CharType.Eng, CharType.Kor];
    const compare = new CompareStr(languagePriority);

    let a = new Char("a");
    let b = new Char("b");
    expect(compare.compareWithCode(a, b)).toEqual(-1);
    expect(compare.compareWithCode(b, a)).toEqual(1);

    a = new Char("a");
    b = new Char("a");
    expect(compare.compareWithCode(a, b)).toEqual(0);
    a = new Char("a");
    b = new Char("A");
    expect(compare.compareWithCode(a, b)).toEqual(0);

    a = new Char("가");
    b = new Char("힣");
    expect(compare.compareWithCode(a, b)).toEqual(-1);
  });

  it("compareWithPriority return the priority by comparing language type priority", () => {
    const languagePriority = [CharType.Etc, CharType.Eng, CharType.Kor];
    const compare = new CompareStr(languagePriority);

    let a = new Char("a");
    let b = new Char("치");
    let aPri = compare.getPriority(a);
    let bPri = compare.getPriority(b);
    expect(compare.compareWithPriority(aPri, bPri)).toEqual(-1);
    expect(compare.compareWithPriority(bPri, aPri)).toEqual(1);

    a = new Char("@");
    b = new Char("k");
    aPri = compare.getPriority(a);
    bPri = compare.getPriority(b);
    expect(compare.compareWithPriority(aPri, bPri)).toEqual(-1);
    expect(compare.compareWithPriority(bPri, aPri)).toEqual(1);

    a = new Char("s");
    b = new Char("k");
    aPri = compare.getPriority(a);
    bPri = compare.getPriority(b);
    expect(compare.compareWithPriority(aPri, bPri)).toEqual(0);
  });

  it("compare return the priority by comparing two strings", () => {
    const languagePriority = [CharType.Etc, CharType.Eng, CharType.Kor];
    const compare = new CompareStr(languagePriority);

    expect(compare.compare("치킨", "apple")).toEqual(1);
    expect(compare.compare("가나", "가나다라마바사아자아자아자!")).toEqual(-1);
    expect(compare.compare("한글englisth%##", "한글%$#@@english")).toEqual(1);
    expect(compare.compare("apple", "banana")).toEqual(-1);
    expect(compare.compare("까르보불닭", "까르보불닭")).toEqual(0);
  });
});
