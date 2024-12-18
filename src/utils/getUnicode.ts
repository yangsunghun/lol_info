// 초성을 추출하는 함수
export const getInitial = (char: string) => {
  const initial = char.charCodeAt(0) - 44032; // '가'의 유니코드 값
  if (initial < 0 || initial > 11172) return null; // 한글 음절 범위 확인
  const initialIndex = Math.floor(initial / 588); // 초성 인덱스 계산
  const initials = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"; // 초성 리스트
  return initials[initialIndex];
};

// 모음을 추출하는 함수
export const getVowel = (char: string) => {
  const initial = char.charCodeAt(0) - 44032; // '가'의 유니코드 값
  if (initial < 0 || initial > 11172) return null; // 한글 음절 범위 확인
  const vowelIndex = Math.floor((initial % 588) / 28); // 중성 인덱스 계산
  const vowels = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"; // 중성 리스트
  return vowels[vowelIndex];
};
