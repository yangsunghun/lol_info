"use client";
import { getInitial, getVowel } from "@/utils/getUnicode";
import { ListData } from "./ui/CardList";

interface CardFilterProps {
  listData: ListData[];
  setFilteredListData: React.Dispatch<React.SetStateAction<ListData[]>>; // 필터링된 데이터 설정 함수
}

const consonants = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const CardFilter: React.FC<CardFilterProps> = ({
  listData,
  setFilteredListData,
}) => {
  const filterByInitial = (initial: string) => {
    // 자음으로 필터링
    const filtered = listData.filter(
      (card) => getInitial(card.name[0]) === initial
    );
    const sorted = filtered.sort((a, b) => {
      const vowelA = getVowel(a.name[0]);
      const vowelB = getVowel(b.name[0]);
      return (vowelA || "").localeCompare(vowelB || "");
    });
    setFilteredListData(sorted);
  };

  return (
    <div className="flex items-end gap-3 mb-8">
      <button onClick={() => setFilteredListData(listData)}>모두 보기</button>
      {consonants.map((consonant) => (
        <button key={consonant} onClick={() => filterByInitial(consonant)}>
          {consonant}
        </button>
      ))}
    </div>
  );
};

export default CardFilter;
