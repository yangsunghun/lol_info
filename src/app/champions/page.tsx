import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/utils/serverApi";
import CardItem from "@/components/ui/CardItem";

export const revalidate = 86400;

const ChampionPage = async () => {
  let champions: ChampionListResponse;
  const version = await getLatestVersion();

  try {
    champions = await fetchChampionList();
  } catch (error) {
    console.error("서버 상태가 원활하지 않습니다", error);
    return <div>서버 상태가 원활하지 않습니다. 불편을 드려 죄송합니다.</div>;
  }

  return (
    <div className="inner m-center">
      <h2 className="page-title">챔피언 목록</h2>

      <ul className="grid grid-cols-5 gap-5">
        {Object.values(champions.data).map((champion) => (
          <CardItem
            key={champion.id}
            cardId={champion.id}
            cardName={champion.name}
            descript={champion.title}
            img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChampionPage;
