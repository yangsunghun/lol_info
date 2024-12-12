"use client";

import { ItemListResponse } from "@/types/Item";
import { fetchItemList } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const {
    data: items,
    isPending,
    isError,
  } = useQuery<ItemListResponse, Error>({
    queryKey: ["championList"],
    queryFn: fetchItemList,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1>아이템 목록</h1>
      <div>
        {items &&
          Object.values(items.data).map((item) => (
            <div key={item.id}>
              <h2>{item?.name}</h2>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${item.image.full}`}
                alt=""
              />
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default page;
