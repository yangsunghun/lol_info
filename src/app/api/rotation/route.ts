import { getChampionRotation } from "@/api/rotateAPi";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
