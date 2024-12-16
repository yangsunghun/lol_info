import { Champion } from "@/types/Champion";
import { fetchChampionDetail, getLatestVersion } from "@/api/serverApi";
import { Metadata } from "next";

interface Props {
  params: {
    detail: string;
  };
}

const getChampionData = async (id: string): Promise<Champion> => {
  return await fetchChampionDetail(id);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const championId = params.detail;

  const { detail } = params;

  // 챔피언 데이터 가져오기
  const champion = await getChampionData(detail);

  return {
    title: `LOL Info: 챔피언 ${champion.name} 정보`,
    description: `${championId}의 자세한 정보`,
    openGraph: {
      title: `LOL Info: ${championId} 챔피언 정보`,
      description: `리그 오브 레전드 챔피언 ${championId}의 자세한 정보를 확인하세요.`,
      url: `http://localhost:3000/champions/${championId}`,
    },
  };
}

const ChampionDetailPage = async ({ params }: Props) => {
  const { detail } = params;

  // 챔피언 데이터 가져오기
  const champion = await getChampionData(detail);
  const version = await getLatestVersion();

  return (
    <div className="inner m-center">
      <h1>{champion.name}</h1>
      <h2>{champion.title}</h2>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
      <p>{champion.blurb}</p>
      <h3>정보</h3>
      <p>공격력: {champion.info?.attack}</p>
      <p>방어력: {champion.info?.defense}</p>
      <p>마법: {champion.info?.magic}</p>
      <p>난이도: {champion.info?.difficulty}</p>

      <h3>스킬</h3>
      {champion.spells?.map((spell) => (
        <div key={spell.id}>
          <h4>{spell.name}</h4>
          <p>{spell.description}</p>
        </div>
      ))}

      <h3>스킨</h3>
      {champion.skins?.map((skin) => (
        <div key={skin.id}>
          <h4>{skin.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default ChampionDetailPage;
