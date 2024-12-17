import React from "react";
import ModalItem from "@/components/ui/Modal";
import Image from "next/image";
import { ChampionSkin, ChampionSpell } from "@/types/Champion";

type Props = {
  selectedModalData: ChampionSkin | ChampionSpell | null;
  isOpen: boolean;
  onClose: () => void;
};

const DetailModalItems = ({ isOpen, onClose, selectedModalData }: Props) => {
  if (!isOpen || !selectedModalData) return null;

  return (
    <ModalItem
      isOpen={isOpen}
      onClose={onClose}
      title={selectedModalData.name}
      description=""
    >
      <div className="flex flex-col items-center gap-4">
        {"num" in selectedModalData ? ( // 스킨인지 확인
          <Image
            src={`YOUR_IMAGE_URL/${selectedModalData.id}_${selectedModalData.num}.jpg`} // 이미지 URL
            alt={selectedModalData.name}
            width={550}
            height={324}
            className="object-cover"
          />
        ) : (
          <div>
            <h3>{selectedModalData.name}</h3>
            <p>{selectedModalData.description}</p>
            {/* 스킬에 대한 추가 정보가 필요하다면 여기에 추가 */}
          </div>
        )}
      </div>
    </ModalItem>
  );
};

export default DetailModalItems;
