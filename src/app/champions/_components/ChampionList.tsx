import React from "react";
import { ChampionListResponse, Champion } from "@/types/Champion";
import CardItem from "@/components/CardItem";

interface ChampionListProps {
  championData: ChampionListResponse;
}

const ChampionList: React.FC<ChampionListProps> = async ({ championData }) => {
  return (
    <ul className="grid grid-cols-5 gap-5">
      {championData &&
        Object.values(championData.data).map((champion) => (
          <CardItem key={champion.id} champion={champion} />
        ))}
    </ul>
  );
};

export default ChampionList;
