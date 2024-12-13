import { Champion } from "@/types/Champion";
import { getLatestVersion } from "@/utils/serverApi";
import Link from "next/link";
import React from "react";

interface ChampionItemProps {
  champion: Champion;
}

const ChampionItem: React.FC<ChampionItemProps> = async ({ champion }) => {
  const version = await getLatestVersion();
  return (
    <li className="list-item" key={champion.id}>
      <Link href={`/champions/${champion.id}`} className="click-box"></Link>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
      <p className="mt-3 text-[20px] font-medium">{champion.name}</p>
      <p className="font-thin">{champion.title}</p>
    </li>
  );
};

export default ChampionItem;
