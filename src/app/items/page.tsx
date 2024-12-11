"use client";

import { ItemListResponse } from "@/types/Item";
import { fetchItemList } from "@/utils/serverApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
  const [items, setItems] = useState<ItemListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 챔피언 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const championData = await fetchItemList();
        //const itemData = await fetchItemList();
        setItems(championData);
        //setItems(itemData);
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
      <h1>아이템 목록</h1>
      <div>
        {items &&
          Object.values(items.data).map((item) => (
            <div key={item.id}>
              <h2>{item?.name}</h2>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/item/${item.image.full}`}
                alt=""
                width={100}
                height={100}
              />
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default page;
