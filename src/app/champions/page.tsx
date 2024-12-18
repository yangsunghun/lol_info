import { ChampionList, ChampionListResponse } from "@/types/Champion";
import { fetchChampionList, getLatestVersion } from "@/api/serverApi";
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

const ChampionPage = async () => {
  const [champions, version] = await Promise.all([
    fetchChampionList(),
    getLatestVersion(),
  ]);

  const mapChampionData = (champions: ChampionList[]) => {
    return champions.map((champion) => ({
      engName: champion.dataName,
      name: champion.dataInfo.name,
      key: champion.dataInfo.key,
      descript: champion.dataInfo.title,
    }));
  };

  const refinedData = mapChampionData(champions);

  return (
    <div className="inner m-center">
      <h2 className="page-title">챔피언 목록</h2>

      <CardList listData={refinedData} mode="champion" version={version} />
    </div>
  );
};

export default ChampionPage;
