import { ChampionRotation } from "@/types/ChampionRotation";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_RIOT_API_KEY;

export const getChampionRotation = async (): Promise<ChampionRotation> => {
  if (!apiKey) {
    throw new Error("API 요청 중 에러가 발생: API 키가 없습니다.");
  }

  try {
    const response = await fetch(
      `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Riot API Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch champion rotation");
    }

    const data: ChampionRotation = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching champion rotation:", error);
    throw error;
  }
};
