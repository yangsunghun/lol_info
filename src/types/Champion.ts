export interface ChampionList {
  dataName: string;
  dataInfo: Champion;
}

export interface ChampionListResponse {
  type: string; // 응답 타입
  format: string; // 데이터 형식
  version: string; // API 버전
  data: { [key: string]: Champion }; // 챔피언 ID를 키로 하는 챔피언 객체의 맵
}

export interface Champion {
  version: string;
  id: string; // 챔피언 ID
  key: string; // 챔피언 키
  name: string; // 챔피언 이름
  title: string; // 챔피언 제목
  image: ChampionImage; // 이미지 정보
  tags: string[]; // 태그
  skins?: ChampionSkin[]; // 스킨 정보 (선택적)
  lore?: string; // 챔피언 전투 이야기 (선택적)
  blurb?: string; // 챔피언 설명 (선택적)
  allytips?: string[]; // 아군 팁 (선택적)
  enemytips?: string[]; // 적군 팁 (선택적)
  partype?: string; // 자원 타입
  info?: ChampionInfo; // 정보
  stats?: ChampionStats; // 통계
  spells?: ChampionSpell[]; // 스펠 정보 (선택적)
  passive?: ChampionPassive; // 패시브 정보 (선택적)
}

export interface ChampionDetail {
  type: string; // 타입 (champion)
  format: string; // 데이터 형식 (standAloneComplex)
  version: string; // API 버전
  data: { [key: string]: Champion }; // 챔피언 데이터, 챔피언 이름을 키로
}

export interface ChampionImage {
  full: string; // 전체 이미지 파일 이름
  sprite: string; // 스프라이트 이미지 파일 이름
  group: string; // 그룹 이름
  x: number; // 스프라이트 내 x 좌표
  y: number; // 스프라이트 내 y 좌표
  w: number; // 너비
  h: number; // 높이
}

export interface ChampionSkin {
  id: string; // 스킨 ID
  num: number; // 스킨 번호
  name: string; // 스킨 이름
  chromas: boolean; // 크로마 여부
}

export interface ChampionPassive {
  name: string; // 패시브 스킬 이름
  description: string; // 패시브 스킬 설명
  image: ChampionImage; // 패시브 이미지 정보
}

export interface ChampionSpell {
  id: string; // 스펠 ID
  name: string; // 스펠 이름
  description: string; // 스펠 설명
  tooltip: string; // 툴팁
  leveltip: {
    label: string[]; // 레벨 팁 레이블
    effect: string[]; // 레벨 팁 효과
  };
  maxrank: number; // 최대 레벨
  cooldown: number[]; // 재사용 대기시간
  cooldownBurn: string; // 재사용 대기시간 문자열
  cost: number[]; // 소모 마나
  costBurn: string; // 소모 마나 문자열
  range: number[]; // 범위
  image: ChampionImage; // 스펠 이미지 정보
  resource: string; // 자원 타입
}

export interface ChampionInfo {
  attack: number; // 공격력
  defense: number; // 방어력
  magic: number; // 마법 능력치
  difficulty: number; // 난이도
}

export interface ChampionStats {
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
