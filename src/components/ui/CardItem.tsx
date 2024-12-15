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

function cleanDescription(description: string) {
  return description
    .replace(/<[^>]*>/g, "") // HTML 태그 제거
    .replace(/@[^@]*@/g, "") // @ 기호로 둘러싸인 부분 제거
    .replace(/\s+/g, " ") // 연속된 공백을 하나로
    .trim(); // 문자열 앞뒤 공백 제거
}

const CardItem: React.FC<RequiredCardItemProps> = ({
  cardId,
  cardName,
  descript,
  img,
}) => {
  return (
    <li className="card-item flex-box">
      {cardId && (
        <Link href={`/champions/${cardId}`} className="click-box"></Link>
      )}
      <figure>
        <Image src={`${img}`} alt={cardName} fill objectFit="cover" />
      </figure>
      <div>
        <p className="text-[20px] font-medium">{cleanDescription(cardName)}</p>
        <p className="mt-1 font-thin">
          {descript ? cleanDescription(descript) : `설명이 없습니다.`}
        </p>
      </div>
    </li>
  );
};

export default CardItem;
