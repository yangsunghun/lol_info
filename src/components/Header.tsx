import Link from "next/link";
import React from "react";
import DarkMode from "./DarkMode";

const Header = () => {
  return (
    <header className="w-full">
      <div className="inner m-center flex-box items-center">
        <h1>
          <Link href="/">
            <svg
              height="100%"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Riot Games</title>
              <path d="M12.534 21.77l-1.09-2.81 10.52.54-.451 4.5zM15.06 0L.307 6.969 2.59 17.471H5.6l-.52-7.512.461-.144 1.81 7.656h3.126l-.116-9.15.462-.144 1.582 9.294h3.31l.78-11.053.462-.144.82 11.197h4.376l1.54-15.37Z" />
            </svg>
            LOL Info
          </Link>
        </h1>
        <nav>
          <ul className="flex-box gap-10">
            <li>
              <Link href="/champions">챔피언 목록</Link>
            </li>
            <li>
              <Link href="/rotation">챔피언 로테이션</Link>
            </li>
            <li>
              <Link href="/items">아이템 목록</Link>
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
