import { ChampionDetail } from "@/types/Champion";
import { useRouter } from "next/router";

interface ChampionPageProps {
  champion: ChampionDetail;
}
const page: React.FC<ChampionPageProps> = ({ champion }) => {
  const router = useRouter();
  const { detail } = router.query;

  if (!detail) {
    return <div>가나다라</div>;
  }

  return (
    <div>
      <div>sdaasdasdas</div>
    </div>
  );
};

export default page;
