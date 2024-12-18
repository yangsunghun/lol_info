"use client";

import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { apiURL } from "@/api/constants";
import ItemModalItems from "@/app/items/ItemModal";
import CardFilter from "../CardFilter";

export interface ListData {
  engName?: string;
  name: string;
  key: string;
  descript: string;
}

interface CardListProps {
  listData: ListData[];
  mode: "champion" | "item";
  version: string | undefined;
  sorting?: boolean;
}

const CardList: React.FC<CardListProps> = ({
  listData,
  version,
  mode,
  sorting,
}) => {
  const [selectedModalData, setSelectedModalData] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredListData, setFilteredListData] =
    useState<ListData[]>(listData);

  const openModal = (modalData: string) => {
    setSelectedModalData(modalData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedModalData(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <ItemModalItems
        selectedModalData={selectedModalData}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {sorting && (
        <CardFilter
          listData={listData}
          setFilteredListData={setFilteredListData}
        />
      )}

      <ul className="grid grid-cols-4 gap-5 pb-[100px]">
        {filteredListData.map((card) => {
          return (
            <CardItem
              key={card.key}
              cardName={card.name}
              descript={card.descript}
              {...(mode === "champion"
                ? {
                    cardId: card.engName,
                    img: `${apiURL}/cdn/${version}/img/${mode}/${card.engName}.png`,
                  }
                : {
                    onClick: () => openModal(card.key),
                    img: `${apiURL}/cdn/${version}/img/${mode}/${card.key}.png`,
                  })}
            />
          );
        })}
      </ul>
    </>
  );
};

export default CardList;
