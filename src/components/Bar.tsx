import { ThemeContext } from "../context/LanguageContext";

import { useContext } from "react";

export function Bar() {
    const language = useContext(ThemeContext);
  return (
    <>
        <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-b-4 mb-10 border-zinc-800">
        <span className="md:border-b-4 md:border-t-4 border-slate-700">
          {language.theme === "pt-BR" ? (
            <span>Filmes mais populares do momento</span>
          ) : (
            <span>Most popular movies of the moment</span>
          )}
        </span>
      </div>
    </>
  )
}