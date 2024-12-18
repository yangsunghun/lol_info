import React from "react";
import ModalItem from "@/components/ui/Modal";
import Image from "next/image";
import { apiURL } from "@/api/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchItemList, getLatestVersion } from "@/api/serverApi";
import Loading from "../loading";
import { cleanSemicolon } from "@/utils/cleanDescript";

type Props = {
  selectedModalData: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const ItemModalItems = ({ isOpen, onClose, selectedModalData }: Props) => {
  if (!isOpen || !selectedModalData) return null;

  const { data: items = [], isPending } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItemList,
  });

  const { data: version } = useQuery({
    queryKey: ["version"],
    queryFn: getLatestVersion,
  });

  // 로딩 중일 때
  if (isPending) {
    return (
      <ModalItem isOpen={isOpen} onClose={onClose}>
        <Loading />
      </ModalItem>
    );
  }

  const selectedItem = items.find(
    (item) => item.dataName === selectedModalData
  );

  if (!selectedItem) {
    return (
      <ModalItem isOpen={isOpen} onClose={onClose}>
        <div>해당 아이템을 찾을 수 없습니다.</div>
      </ModalItem>
    );
  }

  return (
    <ModalItem isOpen={isOpen} onClose={onClose}>
      <article className="flex-box gap-10 items-start max-w-[500px]">
        <figure className="modal-skill-img">
          <Image
            src={`${apiURL}/cdn/${version}/img/item/${selectedItem.dataName}.png`}
            alt={selectedItem.dataInfo.name}
            fill={true}
          />
        </figure>
        <div className="">
          <p className="text-[24px] font-bold mb-1">
            {selectedItem.dataInfo.name}
          </p>
          <p>{cleanSemicolon(selectedItem.dataInfo.colloq)}</p>
          <p>{selectedItem.dataInfo.plaintext}</p>
          <ul className="skill-option flex-box"></ul>
        </div>
      </article>
      {/* export interface Item {
        name: string; // 아이템 이름
        description: string; // 아이템 설명
        colloq: string; // 발음 (콜로크)
        plaintext: string; // 간단한 설명
        into?: string[]; // 업그레이드 가능한 아이템 IDs
        image: ItemImage; // 이미지 정보
        gold: ItemGold; // 가격 정보
        tags: string[]; // 태그
        maps: { [key: string]: boolean }; // 맵에서의 사용 가능 여부
        stats: ItemStats; // 통계
      }
      
      export interface ItemGold {
        base: number; // 기본 가격
        purchasable: boolean; // 구매 가능 여부
        total: number; // 총 가격
        sell: number; // 판매 가격
      } */}
    </ModalItem>
  );
};

export default ItemModalItems;
