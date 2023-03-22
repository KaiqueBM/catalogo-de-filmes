import { ThemeContext } from "../context/LanguageContext";

import { useContext } from "react";

export function Bar() {
  const language = useContext(ThemeContext);
  return (
    <>
      <div className="text-center text-5xl font-extrabold text-zinc-800 uppercase p-5 bg-white mb-10">
        <span title={language.theme} className="">
          {language.theme === "pt-BR" ? (
            <span>Mais filmes</span>
          ) : (
            <span>More movies</span>
          )}
        </span>
      </div>
    </>
  );
}
