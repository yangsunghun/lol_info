"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후 클라이언트에서만 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted가 false일 때는 null 리턴
  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
};

export default DarkMode;
