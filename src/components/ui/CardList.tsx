"use client";

import { ChampionListArray } from "@/types/Champion";
import { ItemListArray } from "@/types/Item";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { getLatestVersion } from "@/api/serverApi";

interface CardListProps {
  listData: ChampionListArray[] | ItemListArray[];
  mode: string;
}

const CardList: React.FC<CardListProps> = ({ listData, mode }) => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await getLatestVersion();
      setVersion(data);
    };
    getData();
  }, []);

  return (
    <ul className="grid grid-cols-4 gap-5">
      {listData && version && mode === "champion"
        ? (listData as ChampionListArray[]).map((item) => {
            console.log(
              `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.dataInfo.image.full}`
            );
            return (
              <CardItem
                key={item.dataInfo.key}
                cardId={item.dataName}
                cardName={item.dataInfo.name}
                descript={item.dataInfo.title}
                img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.dataInfo.image.full}`}
              />
            );
          })
        : (listData as ItemListArray[]).map((item) => {
            console.log(
              `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.dataInfo.image.full}`
            );
            return (
              <CardItem
                key={item.dataName}
                cardId={item.dataName}
                cardName={item.dataInfo.name}
                descript={item.dataInfo.plaintext}
                img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.dataInfo.image.full}`}
              />
            );
          })}
    </ul>
  );
};

export default CardList;
