import { getInitialChar } from "../getInitialChar";

describe("getInitialChar", () => {
  it("return initial character when string is Kor", () => {
    expect(getInitialChar("굽네")).toEqual("ㄱ");
    expect(getInitialChar("땅땅")).toEqual("ㄸ");
    expect(getInitialChar("비비큐")).toEqual("ㅂ");
    expect(getInitialChar("처갓집")).toEqual("ㅊ");
  });

  it("return first charactor when string is not Kor", () => {
    expect(getInitialChar("asdf")).toEqual("a");
    expect(getInitialChar("1234")).toEqual("1");
    expect(getInitialChar("@#!@#")).toEqual("@");
  });
});
