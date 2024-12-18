export interface ItemListResponse {
  type: string; // 응답 타입
  format: string; // 데이터 형식
  version: string; // API 버전
  data: { [key: string]: Item }; // 아이템 ID를 키로 하는 아이템 객체의 맵
}

export interface ItemList {
  dataName: string;
  dataInfo: Item;
}

export interface RefinedItemData {
  refinedData: ItemList[];
  version: string;
}

export interface Item {
  name: string; // 아이템 이름
  description: string; // 아이템 설명
  colloq: string; // 발음 (콜로크)
  plaintext: string; // 간단한 설명
  into?: string[]; // 업그레이드 가능한 아이템 IDs
  image: ItemImage; // 이미지 정보
  gold: ItemGold; // 가격 정보
  tags: string[]; // 태그
  maps: { [key: string]: boolean }; // 맵에서의 사용 가능 여부
  stats: ItemStats; // 통계
}

export interface ItemImage {
  full: string; // 전체 이미지 파일 이름
  sprite: string; // 스프라이트 이미지 파일 이름
  group: string; // 그룹 이름
  x: number; // 스프라이트 내 x 좌표
  y: number; // 스프라이트 내 y 좌표
  w: number; // 너비
  h: number; // 높이
}

export interface ItemGold {
  base: number; // 기본 가격
  purchasable: boolean; // 구매 가능 여부
  total: number; // 총 가격
  sell: number; // 판매 가격
}

export interface ItemStats {
  FlatMovementSpeedMod?: number; // 이동 속도 수정
}
