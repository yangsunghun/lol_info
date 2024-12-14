import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardItemProps {
  cardId: string | null;
  cardName: string;
  descript: string;
  img: string;
}

type RequiredCardItemProps = Omit<CardItemProps, "cardId"> & {
  cardId?: string;
};

const CardItem: React.FC<RequiredCardItemProps> = ({
  cardId,
  cardName,
  descript,
  img,
}) => {
  return (
    <li className="list-item">
      {cardId && (
        <Link href={`/champions/${cardId}`} className="click-box"></Link>
      )}
      <figure>
        <Image src={`${img}`} alt={cardName} layout="fill" objectFit="cover" />
      </figure>
      <p className="mt-3 text-[20px] font-medium">{cardName}</p>
      <p className="font-thin">{descript}</p>
    </li>
  );
};

export default CardItem;
