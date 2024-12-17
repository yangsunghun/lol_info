import { Champion, ChampionList, ChampionListResponse } from "@/types/Champion";
import { RefinedItemData, ItemList, ItemListResponse } from "@/types/Item";
import { apiURL } from "./constants";

// 최신 버전을 가져오는 함수
export const getLatestVersion = async (): Promise<string> => {
  const response = await fetch(`${apiURL}/api/versions.json`);
  if (!response.ok) {
    throw new Error("최신 버전을 가져오는 데 실패했습니다.");
  }
  const versions: string[] = await response.json();
  return versions[0];
};

// 모든 챔피언 목록을 가져오는 함수
export const fetchChampionList = async (): Promise<ChampionList[]> => {
  try {
    const latestVersion = await getLatestVersion();
    const response = await fetch(
      `${apiURL}/cdn/${latestVersion}/data/ko_KR/champion.json`
    );

    if (!response.ok) {
      throw new Error("챔피언 목록을 불러오는데에 실패했습니다.");
    }

    const data: ChampionListResponse = await response.json();

    //return data;

    const refinedData: ChampionList[] = [];

    for (const [key, value] of Object.entries(data.data)) {
      refinedData.push({ dataName: key, dataInfo: value });
    }
    return refinedData;
  } catch (error) {
    console.error("챔피언 목록을 불러오는데에 실패했습니다.", error);
    throw error;
  }
};

// 챔피언의 상세 정보를 가져오는 함수
export const fetchChampionDetail = async (id: string): Promise<Champion> => {
  try {
    const latestVersion = await getLatestVersion();
    const response = await fetch(
      `${apiURL}/cdn/${latestVersion}/data/ko_KR/champion/${id}.json`
    );

    if (!response.ok) {
      throw new Error("챔피언 상세 정보를 불러오는데에 실패했습니다.");
    }

    const data = await response.json();

    return data.data[id];
  } catch (error) {
    console.error("챔피언 상세 정보를 불러오는데에 실패했습니다.", error);
    throw error;
  }
};

// 아이템 목록을 가져오는 함수
export const fetchItemList = async (): Promise<ItemList[]> => {
  try {
    const latestVersion = await getLatestVersion();
    const response = await fetch(
      `${apiURL}/cdn/${latestVersion}/data/ko_KR/item.json`
    );

    if (!response.ok) {
      throw new Error("목록을 불러오는데에 실패했습니다.");
    }

    const data: ItemListResponse = await response.json();
    // return data;

    const refinedData: ItemList[] = [];

    for (const [key, value] of Object.entries(data.data)) {
      refinedData.push({ dataName: key, dataInfo: value });
    }
    //return { refinedData, version: data.version };
    return refinedData;
  } catch (error) {
    console.error("목록을 불러오는데에 실패했습니다.", error);
    throw error;
  }
};
