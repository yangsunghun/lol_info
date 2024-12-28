// useRotation.ts
import { useQuery } from "@tanstack/react-query";
import { ChampionRotation } from "@/types/ChampionRotation";
import { fetchChampionList, getLatestVersion } from "@/api/serverApi";

const useRotation = () => {
  const { data: latestVersion } = useQuery<string>({
    queryKey: ["version"],
    queryFn: getLatestVersion,
  });

  const {
    data: rotation,
    isPending: rotationPending,
    isError: rotationError,
  } = useQuery<ChampionRotation>({
    queryKey: ["championRotation"],
    queryFn: async () => {
      const res = await fetch("/api/rotation");
      if (!res.ok)
        throw new Error("로테이션 데이터를 가져오는 데 실패했습니다.");
      return res.json();
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return { latestVersion, rotation, rotationPending, rotationError };
};

export default useRotation;
