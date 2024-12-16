import Link from "next/link";
import React from "react";
import DarkMode from "./DarkMode";

const Header = () => {
  return (
    <header className="w-full">
      <div className="inner m-center flex-box items-center">
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
            <li>
              <DarkMode />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
