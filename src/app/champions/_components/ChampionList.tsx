import React from "react";
import ChampionItem from "./ChampionItem";
import { ChampionListResponse } from "@/types/Champion";

interface ChampionListProps {
  championData: ChampionListResponse;
}

const ChampionList: React.FC<ChampionListProps> = ({ championData }) => {
  return (
    <ul className="grid grid-cols-5 gap-5">
      {championData &&
        Object.values(championData.data).map((champion) => (
          <ChampionItem key={champion.id} champion={champion} />
        ))}
    </ul>
  );
};

export default ChampionList;
