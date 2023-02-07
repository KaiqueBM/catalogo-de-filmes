import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

import { useContext, useState } from "react";
import { ThemeContext } from "../context/LanguageContext";


import { Fragment } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

import {BsToggleOff, BsToggleOn} from 'react-icons/bs'

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const language = useContext(ThemeContext)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  function paginaInicial() {
    primeiraPagina(1);
  }

  return (
    <nav
      className="flex flex-row justify-between items-center bg-slate-700 h-14 border-b-4 border-slate-200"
      id="topo"
    >
      <div className="text-slate-200 font-bold md:text-3xl text-2xl md:ml-5 ml-1 hover:text-white transition">
        <Link to="/" className="flex" onClick={paginaInicial}>
          <span className="ml-1 -mt-1">
            {language.theme === "pt-BR" ? (<span>CATÁLOGO DE FILMES</span>) : (<span>CATALOG OF MOVIES</span>)}
          </span>
        </Link>
      </div>

      <Fragment>
      <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="transition">{language.theme === "pt-BR" ? (<BsToggleOff className="text-4xl hover:transition-all" onClick={language.toggleTheme} />) : (<BsToggleOn className="text-4xl hover:transition-all" onClick={language.toggleTheme} />)}</Button>
          </PopoverHandler>
          <PopoverContent className="rounded-full z-50">
            <span>Linguagem atual: {language.theme}. Clique no botão novamente para mudar</span>
          </PopoverContent>
        </Popover>
      </Fragment>

      <form onSubmit={handleSubmit} className="md:mr-5 mr-1">
        <input
          className="border-2 border-slate-400 rounded-full bg-slate-200 placeholder:text-black placeholder:text-center p-1.5 pb-0.5 md:w-60 w-40 pl-5 pr-5 hover:bg-white hover:border-slate-200 transition"
          type="text"
          placeholder={language.theme === "pt-BR" ? ("Busque um filme :)") : ("Search for a movie :)")}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        
        <button
          className="border-2 border-slate-400 bg-slate-200 rounded-full p-2 ml-2 hover:bg-white hover:border-slate-200 transition"
          type="submit"
        >
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;

function primeiraPagina(arg0: number) {
  throw new Error("Function not implemented.");
}
