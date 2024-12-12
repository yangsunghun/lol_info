import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-black">
      <div className="inner h-20 m-center flex-box items-center">
        <h1>
          <Link href="/">홈</Link>
        </h1>
        <nav>
          <ul className="flex-box gap-10">
            <li>
              <Link href="/champions">챔피언 목록</Link>
            </li>
            <li>
              <Link href="/items">아이템 목록</Link>
            </li>
            <li>
              <Link href="/rotation">챔피언 로테이션</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
