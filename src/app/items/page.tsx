import { ItemList } from "@/types/Item";
import { fetchItemList, getLatestVersion } from "@/api/serverApi";
import { Metadata } from "next";
import CardList from "@/components/ui/CardList";

export const metadata: Metadata = {
  title: "LOL Info: 아이템 목록",
  description: "리그 오브 레전드 아이템 목록 페이지",
  openGraph: {
    title: "LOL Info: 아이템 목록",
    description: "리그 오브 레전드 아이템 목록 페이지",
    url: "http://localhost:3000/items",
  },
};

const ItemPage = async () => {
  const [items, version] = await Promise.all([
    fetchItemList(),
    getLatestVersion(),
  ]);

  const mapItemData = (items: ItemList[]) => {
    return items.map((item) => ({
      key: item.dataName,
      name: item.dataInfo.name,
      descript: item.dataInfo.plaintext,
    }));
  };

  const refinedData = mapItemData(items);

  return (
    <div className="inner m-center">
      <h2 className="page-title">아이템 목록</h2>

      <CardList
        listData={refinedData}
        mode="item"
        version={version}
        sorting={true}
      />
    </div>
  );
};

export default ItemPage;
