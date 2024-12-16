import { ChampionListArray, ChampionListResponse } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/api/serverApi";
import CardItem from "@/components/ui/CardItem";
import { Metadata } from "next";
import CardList from "@/components/ui/CardList";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "LOL Info: 챔피언 목록",
  description: "리그 오브 레전드 챔피언 목록 페이지",
  openGraph: {
    title: "LOL Info: 챔피언 목록",
    description: "리그 오브 레전드 챔피언 목록 페이지",
    url: "http://localhost:3000/champions",
  },
};
//npx
const ChampionPage = async () => {
  let champions: ChampionListArray[];

  try {
    champions = await fetchChampionList();
  } catch (error) {
    console.error("서버 상태가 원활하지 않습니다", error);
    return <div>서버 상태가 원활하지 않습니다. 불편을 드려 죄송합니다.</div>;
  }

  return (
    <div className="inner m-center">
      <h2 className="page-title">챔피언 목록</h2>

      <CardList listData={champions} mode="champion" />
    </div>
  );
};

export default ChampionPage;
