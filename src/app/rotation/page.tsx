"use client";
import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";
import CardItem from "@/components/ui/CardItem";
import { ChampionRotation } from "@/types/ChampionRotation";

const RotationPage = () => {
  const { data: version, isLoading: versionLoading } = useQuery({
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

  // 챔피언 목록을 가져오는 쿼리 추가
  const {
    data: champions,
    isPending: championPengding,
    isError: championsError,
  } = useQuery<ChampionListResponse>({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
    staleTime: 1000 * 60 * 5,
  });

  if (rotaionPending || championPengding) {
    return <div>로딩 중...</div>;
  }

  if (rotationError || championsError) {
    return <div>에러</div>;
  }

  const { freeChampionIds, freeChampionIdsForNewPlayers } =
    rotation as ChampionRotation;

  console.log(champions);
  console.log(freeChampionIds);
  console.log(freeChampionIdsForNewPlayers);

  // 무료 챔피언 목록
  const freeChampions = freeChampionIds
    .map((id) =>
      champions && champions.data
        ? Object.values(champions.data).find(
            (champion) => champion.key === id.toString()
          )
        : null
    )
    .filter(Boolean);

  // 신규 플레이어를 위한 무료 챔피언 목록
  const newPlayerChampions = freeChampionIdsForNewPlayers
    .map((id) =>
      champions && champions.data
        ? Object.values(champions.data).find(
            (champion) => champion.key === id.toString()
          )
        : null
    )
    .filter(Boolean);

  return (
    <div className="inner m-center">
      <h2 className="page-title">무료 챔피언 목록</h2>
      <ul className="grid grid-cols-5 gap-5">
        {Array.isArray(freeChampions) && freeChampions.length > 0 ? (
          freeChampions.map(
            (champion) =>
              champion && (
                <CardItem
                  key={champion.key}
                  cardId={champion.id}
                  cardName={champion.name}
                  descript={champion.title}
                  img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                />
              )
          )
        ) : (
          <div>무료 챔피언이 없습니다.</div> // 배열이 없거나 비어 있을 때 보여줄 메시지
        )}
      </ul>

      <h2 className="page-title">신규 플레이어를 위한 무료 챔피언 목록</h2>
      <ul className="grid grid-cols-5 gap-5">
        {newPlayerChampions &&
          newPlayerChampions.map(
            (champion) =>
              champion && (
                <CardItem
                  key={champion.key}
                  cardId={champion.id}
                  cardName={champion.name}
                  descript={champion.title}
                  img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                />
              )
          )}
      </ul>
    </div>
  );
};

export default RotationPage;
