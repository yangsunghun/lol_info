"use client";

import { ChampionList } from "@/types/Champion";
import { ItemList } from "@/types/Item";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { getLatestVersion } from "@/api/serverApi";

interface CardListProps {
  listData: ChampionList[] | ItemList[]; // 이게 좀 대충한것 같음
  mode: string;
  version: string;
}
/*
리팩토링 방향
as는 사용하지 말고 listData 부분을 리팩토링 해볼것


*/

const CardList: React.FC<CardListProps> = ({ listData, mode, version }) => {
  return (
    <ul className="grid grid-cols-4 gap-5">
      {listData && version && mode === "champion"
        ? (listData as ChampionList[]).map((item) => {
            return (
              <CardItem
                key={item.dataInfo.key}
                cardId={item.dataName}
                cardName={item.dataInfo.name}
                descript={item.dataInfo.title}
                img={`https://ddragon.leagueoflegends.com/cdn/${item.dataInfo.version}/img/champion/${item.dataName}.png`}
              />
            );
          })
        : (listData as ItemList[]).map((item) => {
            return (
              <CardItem
                key={item.dataName}
                cardId={item.dataName}
                cardName={item.dataInfo.name}
                descript={item.dataInfo.plaintext}
                img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.dataName}.png`}
              />
            );
          })}
    </ul>
  );
};

export default CardList;
