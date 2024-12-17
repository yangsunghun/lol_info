import React from "react";
import ModalItem from "@/components/ui/Modal";
import Image from "next/image";
import { Champion, ChampionSkin, ChampionSpell } from "@/types/Champion";
import { apiURL } from "@/api/constants";

type Props = {
  selectedModalData: ChampionSkin | ChampionSpell | null;
  isOpen: boolean;
  onClose: () => void;
  champion: Champion;
  version: string;
};

const DetailModalItems = ({
  isOpen,
  onClose,
  selectedModalData,
  champion,
  version,
}: Props) => {
  if (!isOpen || !selectedModalData) return null;

  const skinTitle =
    selectedModalData.name === "default" ? "기본" : selectedModalData.name;

  return (
    <ModalItem isOpen={isOpen} onClose={onClose}>
      {"num" in selectedModalData ? ( // 받은 데이터가 스킨인지 검증
        <article className="min-w-[45vw]">
          <p className="text-[24px] font-bold mb-1">{skinTitle}</p>
          <p className="mb-5">
            챔피언 {champion.name}의 {skinTitle} 스킨 입니다.
          </p>
          <figure className="modal-skin-img">
            <Image
              src={`${apiURL}/cdn/img/champion/splash/${champion.id}_${selectedModalData.num}.jpg`}
              alt={selectedModalData.name}
              fill={true}
              className="object-cover"
            />
          </figure>
        </article>
      ) : (
        <article className="flex-box items-start max-w-[500px]">
          <figure className="modal-skill-img">
            <Image
              src={`${apiURL}/cdn/${version}/img/spell/${selectedModalData.image.full}`}
              alt={selectedModalData.name}
              fill={true}
            />
          </figure>
          <div className="skill-info">
            <p className="text-[24px] font-bold mb-1">
              {selectedModalData.name}
            </p>
            <p>{selectedModalData.description}</p>
            <ul className="skill-option flex-box">
              <li>
                <b>최대 레벨</b>
                <span>{selectedModalData.maxrank}</span>
              </li>
              <li>
                <b>재사용 대기시간</b>
                <span>{selectedModalData.cooldownBurn}초</span>
              </li>
              <li>
                <b>소모 마나</b>
                <span>{selectedModalData.costBurn}</span>
              </li>
              <li>
                <b>기본 사정거리</b>
                <span>{selectedModalData.rangeBurn}</span>
              </li>
            </ul>
          </div>

          {/*
                id: string; // 스펠 ID
                name: string; // 스펠 이름
                description: string; // 스펠 설명
                tooltip: string; // 툴팁
                leveltip: {
                  label: string[]; // 레벨 팁 레이블
                  effect: string[]; // 레벨 팁 효과
                };
                maxrank: number; // 최대 레벨
                cooldown: number[]; // 재사용 대기시간
                cooldownBurn: string; // 재사용 대기시간 문자열
                cost: number[]; // 소모 마나
                costBurn: string; // 소모 마나 문자열
                range: number[]; // 범위
                image: ChampionImage; // 스펠 이미지 정보
                resource: string; // 자원 타입
              */}
        </article>
      )}
    </ModalItem>
  );
};

export default DetailModalItems;