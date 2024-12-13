import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList } from "@/utils/serverApi";
import ChampionList from "./_components/ChampionList";

const ChampionPage = async () => {
  let champions: ChampionListResponse;

  try {
    champions = await fetchChampionList();
  } catch (error) {
    console.error("서버 상태가 원활하지 않습니다", error);
    return <div>서버 상태가 원활하지 않습니다. 불편을 드려 죄송합니다.</div>;
  }

  return (
    <div className="inner m-center">
      <h2 className="page-title">챔피언 목록</h2>

      <ChampionList championData={champions} />
    </div>
  );
};

export default ChampionPage;
