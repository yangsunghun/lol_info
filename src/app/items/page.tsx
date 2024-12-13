import { ItemListResponse } from "@/types/Item";
import { fetchItemList } from "@/utils/serverApi";

const ItemPage = async () => {
  let items: ItemListResponse;

  try {
    items = await fetchItemList();
  } catch (error) {
    console.error("데이터를 불러올 수 없습니다.", error);
    return <div>데이터를 불러올 수 없습니다. 불편을 드려 죄송합니다.</div>;
  }

  return (
    <>
      <h2 className="page-title">아이템 목록</h2>
      <div>
        {items &&
          Object.entries(items.data).map(([key, item]) => (
            <div key={key}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${item.image.full}`}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.plaintext}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ItemPage;
