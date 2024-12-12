"use client";

import { ChampionListResponse } from "@/types/Champion";
import { fetchChampionList } from "@/utils/serverApi";
import React, { useEffect, useState } from "react";

const page = () => {
  const [champions, setChampions] = useState<ChampionListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 챔피언 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const championData = await fetchChampionList();

        setChampions(championData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
