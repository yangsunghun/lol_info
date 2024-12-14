import CardItem from "@/components/ui/CardItem";
import { ItemListResponse } from "@/types/Item";
import { fetchItemList, getLatestVersion } from "@/utils/serverApi";

async function getItems() {
  const version = await getLatestVersion();
  let items: ItemListResponse;

  try {
    items = await fetchItemList();
  } catch (error) {
    console.error("데이터를 불러올 수 없습니다.", error);
    throw new Error("데이터를 불러올 수 없습니다.");
  }

  return { items, version };
}

const ItemPage = async () => {
  const { items, version } = await getItems();

  return (
    <div className="inner m-center">
      <h2 className="page-title">아이템 목록</h2>

      <ul className="grid grid-cols-3 gap-5">
        {items &&
          Object.entries(items.data).map(([key, item]) => (
            <CardItem
              key={key}
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
