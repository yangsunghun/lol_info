import CardItem from "@/components/ui/CardItem";
import { ItemListResponse } from "@/types/Item";
import { fetchItemList, getLatestVersion } from "@/utils/serverApi";

export const revalidate = 86400;

const ItemPage = async () => {
  let items: ItemListResponse;
  const version = await getLatestVersion();

  try {
    items = await fetchItemList();
  } catch (error) {
    console.error("데이터를 불러올 수 없습니다.", error);
    return <div>데이터를 불러올 수 없습니다. 불편을 드려 죄송합니다.</div>;
  }

  return (
    <div className="inner m-center">
      <h2 className="page-title">아이템 목록</h2>

      <ul className="grid grid-cols-5 gap-5">
        {items &&
          Object.entries(items.data).map(([key, item]) => (
            <CardItem
              key={key}
              cardId={null}
              cardName={item.name}
              descript={item.plaintext}
              img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
            />
          ))}
      </ul>
    </div>
  );
};

export default ItemPage;
