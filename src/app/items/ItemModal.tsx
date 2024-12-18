import React from "react";
import ModalItem from "@/components/ui/Modal";
import Image from "next/image";
import { apiURL } from "@/api/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchItemList, getLatestVersion } from "@/api/serverApi";
import Loading from "../loading";
import { cleanDescription, cleanSemicolon } from "@/utils/cleanDescript";

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
      <article className="flex-box gap-10 items-center max-w-[500px]">
        <figure className="modal-skill-img">
          <Image
            src={`${apiURL}/cdn/${version}/img/item/${selectedItem.dataName}.png`}
            alt={selectedItem.dataInfo.name}
            fill={true}
          />
        </figure>
        <div className="skill-info">
          <p className="text-[24px] font-bold mb-1">
            {selectedItem.dataInfo.name}
            &nbsp;&nbsp;
            <span className="text-[16px] opacity-50">
              {cleanSemicolon(selectedItem.dataInfo.colloq)}
            </span>
          </p>
          <p>
            {selectedItem.dataInfo.plaintext
              ? cleanDescription(selectedItem.dataInfo.plaintext)
              : `설명이 없습니다.`}
          </p>
        </div>
      </article>
      <p className="mt-5">
        {cleanDescription(selectedItem.dataInfo.description)}
      </p>

      <ul className="mt-5 flex justify-center gap-10 text-center">
        <li>
          <p className="font-bold">기본 가격</p>
          {selectedItem.dataInfo.gold.base}
        </li>
        <li>
          <p className="font-bold">총 가격</p>
          {selectedItem.dataInfo.gold.total}
        </li>
        <li>
          <p className="font-bold">판매 가격</p>
          {selectedItem.dataInfo.gold.sell}
        </li>
      </ul>
    </ModalItem>
  );
};

export default ItemModalItems;
