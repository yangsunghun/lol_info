import { fetchChampionDetail, getLatestVersion } from "@/api/serverApi";
import { Metadata } from "next";
import Detail from "./Detail";

interface Props {
  params: {
    detail: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const championId = params.detail;

  // 챔피언 데이터 가져오기
  const champion = await fetchChampionDetail(championId);

  return {
    title: `LOL Info: 챔피언 ${champion.name} 정보`,
    description: `${champion.lore}`, // lore 추가
    openGraph: {
      title: `LOL Info: ${championId} 챔피언 정보`,
      description: `리그 오브 레전드 챔피언 ${championId}의 자세한 정보를 확인하세요.`,
      url: `http://localhost:3000/champions/${championId}`,
    },
  };
}

const ChampionDetailPage = async ({ params }: Props) => {
  const championId = params.detail;

  const [champion, version] = await Promise.all([
    fetchChampionDetail(championId),
    getLatestVersion(),
  ]);

  return <Detail champion={champion} version={version} />;
};

export default ChampionDetailPage;
