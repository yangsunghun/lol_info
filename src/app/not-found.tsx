"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="exclude-header flex items-center justify-center">
      <div className="text-center">
        <p className="text-[40px]">페이지 오류 안내 404</p>
        <p className="mt-5">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </p>
        <div className="mt-6 flex justify-center gap-10">
          <Button asChild size="lg" color="danger" fill={true}>
            <Link href="/" className="text-blue-500">
              홈으로
            </Link>
          </Button>
          <Button
            handleClick={handleGoBack}
            size="lg"
            color="secondary"
            fill={true}
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
