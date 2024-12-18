import { cleanDescription } from "@/utils/cleanDescript";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardItemProps {
  cardId?: string;
  cardName: string;
  descript: string;
  img: string;
  onClick?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
  cardId,
  cardName,
  descript,
  img,
  onClick,
}) => {
  return (
    <li className="card-item flex-box">
      {cardId ? (
        <Link href={`/champions/${cardId}`} className="click-box"></Link>
      ) : (
        <button className="click-box" onClick={onClick}></button>
      )}
      <figure>
        <Image
          src={`${img}`}
          alt={cardName}
          fill={true}
          sizes="(max-width: 768px) 100%"
        />
      </figure>
      <div>
        <p className="text-[20px] font-medium">{cleanDescription(cardName)}</p>
        <p className="mt-1 font-light">
          {descript ? cleanDescription(descript) : `설명이 없습니다.`}
        </p>
      </div>
    </li>
  );
};

export default CardItem;
