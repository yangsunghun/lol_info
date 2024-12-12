import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList } from "@/utils/serverApi";

const page = async () => {
  let champions: ChampionListResponse;

  try {
    // 서버에서 직접 데이터를 가져옵니다.
    champions = await fetchChampionList(); // 여기서 fetchChampionList는 실제 API를 호출하는 함수입니다.
  } catch (error) {
    console.error("서버 상태가 원활하지 않습니다", error);
    return <div>서버 상태가 원활하지 않습니다. 불편을 드려 죄송합니다.</div>;
  }
  return <div>page</div>;
};

export default page;
