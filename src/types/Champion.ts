interface Champion {
  id: string; // 챔피언 ID
  key: string; // 챔피언 키
  name: string; // 챔피언 이름
  title: string; // 챔피언 제목
  image: ChampionImage; // 이미지 정보
  tags: string[]; // 태그
}

interface ChampionDetail extends Champion {
  version: string; // 버전
  blurb: string; // 설명
  info: ChampionInfo; // 정보
  partype: string; // 자원 타입
  stats: ChampionStats; // 통계
}

interface ChampionImage {
  full: string; // 전체 이미지 파일 이름
  sprite: string; // 스프라이트 이미지 파일 이름
  group: string; // 그룹 이름
  x: number; // 스프라이트 내 x 좌표
  y: number; // 스프라이트 내 y 좌표
  w: number; // 너비
  h: number; // 높이
}

interface ChampionInfo {
  attack: number; // 공격력
  defense: number; // 방어력
  magic: number; // 마법 능력치
  difficulty: number; // 난이도
}

interface ChampionStats {
  hp: number; // 체력
  hpperlevel: number; // 레벨당 체력 증가량
  mp: number; // 마나
  mpperlevel: number; // 레벨당 마나 증가량
  movespeed: number; // 이동 속도
  armor: number; // 방어력
  armorperlevel: number; // 레벨당 방어력 증가량
  spellblock: number; // 마법 저항력
  spellblockperlevel: number; // 레벨당 마법 저항력 증가량
  attackrange: number; // 공격 범위
  hpregen: number; // 체력 재생
  hpregenperlevel: number; // 레벨당 체력 재생 증가량
  mpregen: number; // 마나 재생
  mpregenperlevel: number; // 레벨당 마나 재생 증가량
  crit: number; // 치명타 확률
  critperlevel: number; // 레벨당 치명타 확률 증가량
  attackdamage: number; // 공격력
  attackdamageperlevel: number; // 레벨당 공격력 증가량
  attackspeedperlevel: number; // 레벨당 공격 속도 증가량
  attackspeed: number; // 공격 속도
}
