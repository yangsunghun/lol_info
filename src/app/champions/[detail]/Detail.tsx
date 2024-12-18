"use client";
import Image from "next/image";
import { apiURL } from "@/api/constants";
import {
  Champion,
  ChampionInfo,
  ChampionSkin,
  ChampionSpell,
} from "@/types/Champion";
import React, { useEffect, useState } from "react";
import SkinCarousel from "@/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import DetailModalItems from "./DetailModal";
import { cleanDescription } from "@/utils/cleanDescript";

type Props = {
  champion: Champion;
  version: string;
};

interface Stat {
  label: string;
  valueKey: keyof ChampionInfo;
  color: string;
}

const stats: Stat[] = [
  { label: "생명력", valueKey: "defense", color: "#5edc01" },
  { label: "공격력", valueKey: "attack", color: "#ef2401" },
  { label: "주문력", valueKey: "magic", color: "#02a2ff" },
  { label: "난이도", valueKey: "difficulty", color: "#a800ff" },
];

const Detail = ({ champion, version }: Props) => {
  if (!champion) {
    return <div>챔피언 정보를 찾을 수 없습니다.</div>;
  }

  const [selectedModalData, setSelectedModalData] = useState<
    ChampionSkin | ChampionSpell | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [barWidths, setBarWidths] = useState<Record<string, string>>({});

  useEffect(() => {
    const newBarWidths: Record<string, string> = {};
    stats.forEach((stat) => {
      const value = champion.info?.[stat.valueKey]; // info가 undefined일 수 있음
      newBarWidths[stat.valueKey] = value != null ? `${value}0%` : "0%"; // null 체크 후 설정
    });
    setBarWidths(newBarWidths);
  }, [champion.info]);

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
        champion={champion}
        version={version}
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
              {champion.lore}
            </p>

            <div className="flex gap-20">
              <article>
                <p className="mt-10 text-[24px] font-semibold">스킬</p>
                <ul className="mt-2 skills flex gap-5">
                  {champion.passive && (
                    <li
                      style={{
                        backgroundImage: `url(${apiURL}/cdn/${version}/img/passive/${champion.passive.image.full})`,
                      }}
                    >
                      <p className="keyboard">P</p>
                      <div className="skill-hover">
                        <p className="text-[20px] font-semibold mb-2">
                          {champion.passive.name}
                        </p>
                        <p>{cleanDescription(champion.passive.description)}</p>
                      </div>
                    </li>
                  )}
                  {spellsWithKeys.map((spell) => (
                    <li
                      key={spell.id}
                      style={{
                        backgroundImage: `url(${apiURL}/cdn/${version}/img/spell/${spell.image.full})`,
                      }}
                    >
                      <button
                        className="click-box"
                        onClick={() => openModal(spell)}
                      ></button>

                      <p className="keyboard">{spell.key}</p>
                      <div className="skill-hover">
                        <p className="text-[20px] font-semibold mb-2">
                          {spell.name}
                        </p>
                        <p>{spell.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="champ-stats">
                <p className="mt-10 text-[24px] font-semibold">능력치</p>
                <ul className="stats-bar">
                  {stats.map((stat) => (
                    <li key={stat.valueKey}>
                      <b>{stat.label}</b>
                      <div className="bar">
                        <div
                          className="bar-fill"
                          style={{
                            width: barWidths[stat.valueKey] || "0%", // 초기값 0%
                            backgroundColor: stat.color,
                          }}
                          title={
                            champion.info?.[stat.valueKey]?.toString() || "0"
                          } // title 설정
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>

        <p className="mt-[50px] mb-3 text-[24px] font-semibold">챔피언 스킨</p>
        <SkinCarousel>
          {champion.skins?.map((skin) => (
            <SwiperSlide key={skin.id}>
              <figure className="skin-img relative">
                <button
                  className="click-box"
                  onClick={() => openModal(skin)}
                ></button>
                <Image
                  src={`${apiURL}/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`}
                  alt={skin.name}
                  width={260}
                  height={154}
                  priority
                  className="object-cover rounded-lg"
                />
              </figure>
            </SwiperSlide>
          ))}
        </SkinCarousel>
      </section>
    </>
  );
};

export default Detail;
