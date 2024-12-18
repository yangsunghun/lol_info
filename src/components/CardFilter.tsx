"use client";
import { getInitial, getVowel } from "@/utils/getUnicode";
import { ListData } from "./ui/CardList";

interface CardFilterProps {
  listData: ListData[];
  setFilteredListData: React.Dispatch<React.SetStateAction<ListData[]>>; // 필터링된 데이터 설정 함수
}

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
      <button onClick={() => filterByInitial("ㄱ")}>ㄱ</button>
      <button onClick={() => filterByInitial("ㄴ")}>ㄴ</button>
      <button onClick={() => filterByInitial("ㄷ")}>ㄷ</button>
      <button onClick={() => filterByInitial("ㄹ")}>ㄹ</button>
      <button onClick={() => filterByInitial("ㅁ")}>ㅁ</button>
      <button onClick={() => filterByInitial("ㅂ")}>ㅂ</button>
      <button onClick={() => filterByInitial("ㅃ")}>ㅃ</button>
      <button onClick={() => filterByInitial("ㅅ")}>ㅅ</button>
      <button onClick={() => filterByInitial("ㅆ")}>ㅆ</button>
      <button onClick={() => filterByInitial("ㅇ")}>ㅇ</button>
      <button onClick={() => filterByInitial("ㅈ")}>ㅈ</button>
      <button onClick={() => filterByInitial("ㅊ")}>ㅊ</button>
      <button onClick={() => filterByInitial("ㅋ")}>ㅋ</button>
      <button onClick={() => filterByInitial("ㅌ")}>ㅌ</button>
      <button onClick={() => filterByInitial("ㅍ")}>ㅍ</button>
      <button onClick={() => filterByInitial("ㅎ")}>ㅎ</button>
    </div>
  );
};

export default CardFilter;
