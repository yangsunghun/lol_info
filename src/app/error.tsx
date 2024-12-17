"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, startTransition } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <section className="not-found flex items-center justify-center">
      <div className="text-center">
        <p className="text-[30px]">예기치 않은 오류가 발생했습니다</p>
        <p className="mt-5">에러 내용: {error.message}</p>
        <div className="mt-6 flex justify-center gap-5">
          <Button asChild size="lg" color="danger" fill={true}>
            <Link href="/" className="text-blue-500">
              홈으로
            </Link>
          </Button>
          <Button
            handleClick={handleRefresh}
            size="lg"
            color="secondary"
            fill={true}
          >
            새로고침
          </Button>
        </div>
      </div>
    </section>
  );
}
