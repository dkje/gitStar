//  입력된 문자열의 첫번째 글자를 기준으로
// 한글일시 초성 반환
// 그 외엔 문자 그대로 반환하는 함수
export const getInitialChar = (str: string) => {
  const cho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  let result = "";
  let code = str.charCodeAt(0) - 44032;
  if (code > -1 && code < 11172) {
    result += cho[Math.floor(code / 588)];
  } else {
    result += str.charAt(0);
  }
  return result;
};
