"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const displayChampionRotation = async () => {
      try {
        const response = await fetch("/api/rotation"); // Next.js API 호출
        if (!response.ok) {
          throw new Error("Failed to fetch champion rotation");
        }
        const rotation = await response.json();
        console.log("챔피언 로테이션 데이터:", rotation); // 데이터 출력
      } catch (error) {
        console.error(
          "챔피언 로테이션 데이터를 가져오는 데 실패했습니다:",
          error
        );
      }
    };

    displayChampionRotation();
  }, []);

  return <div>asdasdasdasd</div>;
}
