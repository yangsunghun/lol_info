import { ChampionDetail, ChampionListResponse } from "@/types/Champion";
import { ItemListResponse } from "@/types/Item";

// 최신 버전을 가져오는 함수
const getLatestVersion = async (): Promise<string> => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch versions");
  }
  const versions: string[] = await response.json();
  return versions[0]; // 최신 버전 반환
};

// 모든 챔피언 목록을 가져오는 함수
export const fetchChampionList = async (): Promise<ChampionListResponse> => {
  try {
    const version = await getLatestVersion();
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
    );

    if (!response.ok) {
      throw new Error("챔피언 목록을 불러오는데에 실패했습니다.");
    }

    const data: ChampionListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("챔피언 목록을 불러오는데에 실패했습니다.", error);
    throw error;
  }
};

// 특정 챔피언의 상세 정보를 가져오는 함수
export const fetchChampionDetail = async (
  id: string
): Promise<ChampionDetail> => {
  try {
    const version = await getLatestVersion();
    const response = await fetch(`${version}/data/ko_KR/champion/${id}.json`);

    if (!response.ok) {
      throw new Error("챔피언 상세 정보를 불러오는데에 실패했습니다.");
    }

    const data: ChampionDetail = await response.json();
    return data;
  } catch (error) {
    console.error("챔피언 상세 정보를 불러오는데에 실패했습니다.", error);
    throw error;
  }
};

// 모든 아이템 목록을 가져오는 함수
export const fetchItemList = async (): Promise<ItemListResponse> => {
  try {
    const version = await getLatestVersion();
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`
    );

    if (!response.ok) {
      throw new Error("목록을 불러오는데에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("목록을 불러오는데에 실패했습니다.", error);
    throw error;
  }
};
