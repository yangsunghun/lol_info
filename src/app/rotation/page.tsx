"use client";
import { ChampionList } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/api/serverApi";
import { useQuery } from "@tanstack/react-query";
import { ChampionRotation } from "@/types/ChampionRotation";
import CardList from "@/components/ui/CardList";
import Loading from "../loading";
import useRotation from "@/hooks/useRotation";

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
  const { latestVersion, rotation, rotationPending, rotationError } =
    useRotation();

  const {
    data: champions,
    isPending: championPending,
    isError: championsError,
  } = useQuery<ChampionList[]>({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
    staleTime: 1000 * 60 * 5,
  });

  if (rotationPending || championPending) {
    return <Loading />;
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

  // 신규 플레이어를 위한 무료 챔피언 목록
  const newPlayerChampions = (freeChampionIdsForNewPlayers || [])
    .map((id) =>
      champions.find((champion) => champion.dataInfo.key === id.toString())
    )
    .filter((champion): champion is ChampionList => champion !== undefined);

  const mapChampionData = (champions: ChampionList[]) => {
    return champions.map((champion) => ({
      engName: champion.dataName,
      name: champion.dataInfo.name,
      key: champion.dataInfo.key,
      descript: champion.dataInfo.title,
    }));
  };

  const refinedFreeChampions = mapChampionData(freeChampions);
  const refinedNewPlayerChampions = mapChampionData(newPlayerChampions);

  return (
    <div className="inner m-center">
      <h2 className="page-title">이번 주 무료 챔피언</h2>
      <CardList
        listData={refinedFreeChampions}
        mode="champion"
        version={latestVersion}
      />

      <h2 className="page-title">신규 플레이어를 위한 무료 챔피언</h2>
      <CardList
        listData={refinedNewPlayerChampions}
        mode="champion"
        version={latestVersion}
      />
    </div>
  );
};

export default RotationPage;
