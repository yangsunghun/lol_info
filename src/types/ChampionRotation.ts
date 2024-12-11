export interface ChampionRotation {
  maxNewPlayerLevel: number; // 신규 플레이어의 최대 레벨
  freeChampionIdsForNewPlayers: number[]; // 신규 플레이어를 위한 무료 챔피언 ID 목록
  freeChampionIds: number[]; // 무료 챔피언 ID 목록
}
