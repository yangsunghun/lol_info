import { ChampionListResponse } from "@/types/Champion";

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
      throw new Error("Failed to fetch champion list");
    }

    const data: ChampionListResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching champion list:", error);
    throw error; // 에러를 호출자에게 전달
  }
};

// 모든 아이템 목록을 가져오는 함수
export const fetchItemList = async (): Promise<any> => {
  try {
    const version = await getLatestVersion();
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch item list");
    }

    const data = await response.json();
    return data; // 아이템 목록 반환
  } catch (error) {
    console.error("Error fetching item list:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
