import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="exclude-header">
      <div className="inner m-center flex flex-col justify-center h-full">
        <h2 className="intro-title text-center text-[40px]">
          <Image src="/logo.png" alt="챔피언" width={300} height={132} />
        </h2>
        <ul className="intro-layout m-center flex-box">
          <li>
            <Image src="/champions.png" alt="챔피언" width={375} height={375} />
            <Link
              className="click-box flex justify-center items-center"
              href="/champions"
            >
              챔피언
            </Link>
          </li>
          <li>
            <Image src="/rotation.png" alt="챔피언" width={375} height={375} />
            <Link
              className="click-box flex justify-center items-center"
              href="/rotation"
            >
              이번 주 로테이션
            </Link>
          </li>
          <li>
            <Image src="/items.png" alt="챔피언" width={375} height={375} />
            <Link
              className="click-box flex justify-center items-center"
              href="/items"
            >
              아이템
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
