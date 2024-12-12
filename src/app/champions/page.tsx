import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const {
    data: champions,
    isPending,
    isError,
  } = useQuery<ChampionListResponse, Error>({
    queryKey: ["championList"],
    queryFn: fetchChampionList,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1>챔피언 목록</h1>

      {champions &&
        Object.values(champions.data).map((champion) => (
          <div key={champion.id}>
            <h2>{champion.name}</h2>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.image.full}`}
              alt=""
            />
            <p>{champion.image.full}</p>
            <p>{champion.title}</p>
          </div>
        ))}
    </>
  );
};

export default page;
