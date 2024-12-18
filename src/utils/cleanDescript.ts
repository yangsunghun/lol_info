export function cleanDescription(description: string) {
  return description
    .replace(/<[^>]*>/g, "") // HTML 태그 제거
    .replace(/@[^@]*@/g, "") // @ 기호로 둘러싸인 부분 제거
    .replace(/\s+/g, " ") // 연속된 공백을 하나로
    .trim(); // 문자열 앞뒤 공백 제거
}

export function cleanSemicolon(description: string) {
  return description
    .replace(/[a-zA-Z0-9]+/g, "") // 영문과 숫자 제거
    .replace(/[;' -]/g, "") // 세미콜론 제거
    .replace(/\s+/g, " ") // 연속된 공백을 하나로
    .trim(); // 문자열 앞뒤 공백 제거
}
