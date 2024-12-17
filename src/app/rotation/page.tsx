"use client";
import { ChampionList, ChampionListResponse } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/api/serverApi";
import { useQuery } from "@tanstack/react-query";
import CardItem from "@/components/ui/CardItem";
import { ChampionRotation } from "@/types/ChampionRotation";
import { Metadata } from "next";
import CardList from "@/components/ui/CardList";

// export const metadata: Metadata = {
//   title: "LOL Info: 이번주 로테이션",
//   description: "리그 오브 레전드 이번주 로테이션을 확인하세요.",
//   openGraph: {
//     title: "LOL Info: 이번주 로테이션",
//     description: "리그 오브 레전드 게임 이번주 로테이션",
//     url: "http://localhost:3000/rotation",
//   },
// };

const RotationPage = () => {
  const { data: latestVersion } = useQuery<string>({
    queryKey: ["version"],
    queryFn: getLatestVersion,
  });

  const {
    data: rotation,
    isPending: rotaionPending,
    isError: rotationError,
  } = useQuery<ChampionRotation>({
    queryKey: ["championRotation"],
    queryFn: async () => {
      const res = await fetch("/api/rotation");
      if (!res.ok)
        throw new Error("로테이션 데이터를 가져오는 데 실패했습니다.");
      return res.json();
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: champions,
    isPending: championPending,
    isError: championsError,
  } = useQuery<ChampionList[]>({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
    staleTime: 1000 * 60 * 5,
  });

  if (rotaionPending || championPending) {
    return <div>로딩 중...</div>;
  }

  if (rotationError || championsError) {
    return <div>에러</div>;
  }

  const { freeChampionIds, freeChampionIdsForNewPlayers } =
    rotation as ChampionRotation;

  // 무료 챔피언 목록
  const freeChampions = (freeChampionIds || [])
    .map((id) =>
      champions.find((champion) => champion.dataInfo.key === id.toString())
    )
    .filter((champion): champion is ChampionList => champion !== undefined);

  console.log(freeChampions);

  // 신규 플레이어를 위한 무료 챔피언 목록
  const newPlayerChampions = (freeChampionIdsForNewPlayers || [])
    .map((id) =>
      champions.find((champion) => champion.dataInfo.key === id.toString())
    )
    .filter((champion): champion is ChampionList => champion !== undefined);

  console.log(newPlayerChampions);

  return (
    <div className="inner m-center">
      <h2 className="page-title">무료 챔피언 목록</h2>
      <CardList
        listData={freeChampions}
        mode="champion"
        version={latestVersion}
      />

      <h2 className="page-title">신규 플레이어를 위한 무료 챔피언 목록</h2>
      <CardList
        listData={newPlayerChampions}
        mode="champion"
        version={latestVersion}
      />
    </div>
  );
};

export default RotationPage;
