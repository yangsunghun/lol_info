import { Champion } from "@/types/Champion";
import React from "react";

interface ChampionItemProps {
  champion: Champion;
}

const ChampionItem: React.FC<ChampionItemProps> = ({ champion }) => {
  return (
    <li className="list-item" key={champion.id}>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.image.full}`}
        alt=""
      />
      <p>{champion.name}</p>
      <p>{champion.title}</p>
    </li>
  );
};

export default ChampionItem;
