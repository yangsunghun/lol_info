import { ChampionListResponse } from "@/types/Champion";
import { ChampionRotation } from "@/types/ChampionRotation";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";
import { getChampionRotation } from "../api/rotation/route";

const Page = async () => {
  const version = await getLatestVersion();

  let champions: ChampionListResponse;
  let rotation: ChampionRotation;

  try {
    champions = await fetchChampionList();
    rotation = await getChampionRotation();
  } catch (error) {
    console.error("서버 상태가 원활하지 않습니다", error);
    return <div>서버 상태가 원활하지 않습니다. 불편을 드려 죄송합니다.</div>;
  }

  // 무료 챔피언 목록
  const freeChampions = rotation.freeChampionIds
    .map((id) =>
      Object.values(champions.data).find(
        (champion) => champion.key === id.toString() // champion의 key는 문자열로 저장된 숫자라서
      )
    )
    .filter(Boolean); // 일치하는 값들만 남기기

  // 신규 플레이어를 위한 무료 챔피언 목록
  const newPlayerChampions = rotation.freeChampionIdsForNewPlayers
    .map((id) =>
      Object.values(champions.data).find(
        (champion) => champion.key === id.toString()
      )
    )
    .filter(Boolean);

  console.log(freeChampions);
  console.log(newPlayerChampions);

  return (
    <div>
      <h2>무료 챔피언 목록</h2>
      <ul>
        {freeChampions.map(
          (champion) =>
            champion && (
              <li key={champion.id}>
                <h2>{champion.name}</h2>
                <p>{champion.title}</p>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                  alt={champion.name}
                />
              </li>
            )
        )}
      </ul>

      <h2>신규 플레이어를 위한 무료 챔피언 목록</h2>
      <ul>
        {newPlayerChampions.map(
          (champion) =>
            champion && (
              <li key={champion.id}>
                <h2>{champion.name}</h2>
                <p>{champion.title}</p>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                  alt={champion.name}
                />
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Page;
