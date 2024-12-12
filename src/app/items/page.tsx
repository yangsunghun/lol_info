import { ItemListResponse } from "@/types/Item";
import { fetchItemList } from "@/utils/serverApi";

const page = async () => {
  let items: ItemListResponse;

  try {
    items = await fetchItemList();
  } catch (error) {
    console.error("데이터를 불러올 수 없습니다.", error);
    return <div>데이터를 불러올 수 없습니다. 불편을 드려 죄송합니다.</div>;
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
