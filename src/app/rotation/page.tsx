import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList } from "@/utils/serverApi";

const Page = async () => {
  let champions: ChampionListResponse;

  try {
    champions = await fetchChampionList();
  } catch (error) {
    console.error("서버 상태가 원활하지 않습니다", error);
    return <div>서버 상태가 원활하지 않습니다. 불편을 드려 죄송합니다.</div>;
  }

  return (
    <div>
      <h1>챔피언 목록</h1>
      <ul>
        {Object.values(champions.data).map((champion) => (
          <li key={champion.id}>
            <h2>{champion.name}</h2>
            <p>{champion.title}</p>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${champion.image.full}`}
              alt={champion.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
