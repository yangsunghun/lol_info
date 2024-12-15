import { ChampionRotation } from "@/types/ChampionRotation";
import { NextResponse } from "next/server";

const API_KEY: string | undefined = process.env.NEXT_PUBLIC_RIOT_API_KEY;

if (!API_KEY) {
  throw new Error("API 요청 중 에러가 발생: API 키가 없습니다.");
}

export const getChampionRotation = async (): Promise<ChampionRotation> => {
  try {
    const response = await fetch(
      `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": API_KEY,
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

export async function GET() {
  try {
    const rotation = await getChampionRotation();

    return NextResponse.json({
      freeChampionIds: rotation.freeChampionIds,
      freeChampionIdsForNewPlayers: rotation.freeChampionIdsForNewPlayers,
      maxNewPlayerLevel: rotation.maxNewPlayerLevel,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
