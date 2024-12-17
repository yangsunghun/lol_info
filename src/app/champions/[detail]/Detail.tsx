"use client";
import Image from "next/image";
import { apiURL } from "@/api/constants";
import { Champion, ChampionSkin, ChampionSpell } from "@/types/Champion";
import React, { useState } from "react";
import SkinCarousel from "@/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import DetailModalItems from "./DetailModal";

type Props = {
  champion: Champion;
  version: string;
};

const Detail = ({ champion, version }: Props) => {
  if (!champion) {
    return <div>챔피언 정보를 찾을 수 없습니다.</div>;
  }

  const [selectedModalData, setSelectedModalData] = useState<
    ChampionSkin | ChampionSpell | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (modalData: ChampionSkin | ChampionSpell) => {
    setSelectedModalData(modalData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedModalData(null);
    setIsModalOpen(false);
  };

  const keyBoard: string[] = ["Q", "W", "E", "R"];
  const spellsWithKeys: ChampionSpell[] =
    champion.spells?.map((spell: ChampionSpell, index: number) => ({
      ...spell,
      key: keyBoard[index] || "",
    })) || [];

  return (
    <>
      <DetailModalItems
        selectedModalData={selectedModalData}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <section className="inner m-center pt-[50px] pb-[100px]">
        <div className="flex-box align-center">
          <div
            className="champ-image"
            style={{
              backgroundImage: `url(${apiURL}/cdn/img/champion/loading/${champion.id}_0.jpg)`,
            }}
          ></div>
          <div className="champ-info">
            <p className="text-[18px]  opacity-[.7]">{champion.title}</p>
            <p className="text-[30px] font-semibold">{champion.name}</p>
            <p className="text-[17px] font-light leading-[1.6] mt-5 max-w-[80%] break-keep opacity-[.9]">
              {champion.blurb}
            </p>

            <div className="mt-10 flex flex-row gap-4">
              <p>공격력: {champion.info?.attack ?? "정보 없음"}</p>
              <p>방어력: {champion.info?.defense ?? "정보 없음"}</p>
              <p>마법: {champion.info?.magic ?? "정보 없음"}</p>
              <p>난이도: {champion.info?.difficulty ?? "정보 없음"}</p>
            </div>

            <p className="mt-10 text-[24px] font-semibold">스킬</p>
            <ul className="mt-2 skills flex">
              {spellsWithKeys.map((spell) => (
                <li key={spell.id}>
                  <button
                    className="click-box"
                    onClick={() => openModal(spell)}
                  ></button>
                  <img
                    src={`${apiURL}/cdn/${version}/img/spell/${spell.image.full}`}
                    alt={spell.name}
                  />
                  <div className="">
                    <p>{spell.key}</p>
                    <p>{spell.name}</p>
                    <p>{spell.description}</p>
                  </div>
                </li>
              ))}
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
            </ul>
          </div>
        </div>

        <p className="mt-20">스킨</p>
        <SkinCarousel>
          {champion.skins?.map((skin) => (
            <SwiperSlide key={skin.id}>
              <figure className="skin-img">
                <Image
                  src={`${apiURL}/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                  alt={skin.name}
                  width={260}
                  height={154}
                  priority
                  className="object-cover rounded-lg"
                />
                <figcaption>{skin.name}</figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </SkinCarousel>
      </section>
    </>
  );
};

export default Detail;
