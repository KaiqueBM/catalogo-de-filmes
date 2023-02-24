import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2, BiUpArrowCircle } from "react-icons/bi";

import {BsFillHouseFill, BsSearch, BsCardList} from "react-icons/bs";

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
    <>
    <nav
      className="flex flex-row justify-between items-center bg-slate-700 h-14 border-b-4 border-slate-200"
      id="topo"
    >
      <div className="text-slate-200 font-bold md:text-3xl text-lg md:ml-5 ml-1 hover:text-white transition" id="topo">
        <Link to="/" className="flex" onClick={paginaInicial}>
          <span className="ml-1 -mt-1">
            {language.theme === "pt-BR" ? (<span>CATÁLOGO DE FILMES</span>) : (<span>CATALOG OF MOVIES</span>)}
          </span>
        </Link>
      </div>

      <Fragment>
      <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="transition hover:bg-slate-400 p-1 rounded-lg">{language.theme === "pt-BR" ? (<BsToggleOff className="md:text-4xl text-2xl hover:transition-all" onClick={language.toggleTheme} />) : (<BsToggleOn className="text-4xl hover:transition-all" onClick={language.toggleTheme} />)}</Button>
          </PopoverHandler>
          <PopoverContent className="rounded-full z-50">
            <span>Linguagem atual: {language.theme}. Clique no botão novamente para mudar</span>
          </PopoverContent>
        </Popover>
      </Fragment>

      <form onSubmit={handleSubmit} className="md:mr-5 ml-1 -mr-2">
        <input
          className="border-2 border-slate-400 rounded-bl-xl rounded-tl-xl bg-slate-100 placeholder:text-black placeholder:text-left md:p-1.5 p-1 md:pb-0.5 pb-0 text-lg md:w-60 w-9/12 md:pl-5 md:pr-5 hover:bg-white hover:border-slate-200 transition"
          type="text"
          placeholder={language.theme === "pt-BR" ? ("Pesquisar") : ("Search")}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        
        <button
          className="border-2 border-slate-400 bg-slate-600 rounded-br-xl rounded-tr-xl md:p-2.5 p-1.5 hover:bg-white hover:border-slate-200 transition text-white text-lg hover:text-black"
          type="submit"
        >
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>

    <div className="fixed bottom-0 left-0 mx-auto h-12 mb-5 rounded-full w-full z-50">
        <div className="flex flex-row justify-center ">
          <div className="bg-slate-600 flex flex-row pl-10 pr-10 rounded-full ml-2 mr-2">
          <div className="p-2 ml-1 mr-1 text-4xl text-white"><BsFillHouseFill /></div>
          <div className="p-1 ml-1 mr-1 text-4xl text-white">

          <Fragment>
      <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="transition hover:bg-slate-500 p-1 rounded-lg">{language.theme === "pt-BR" ? (<BsToggleOff className=" hover:transition-all" onClick={language.toggleTheme} />) : (<BsToggleOn className="hover:transition-all" onClick={language.toggleTheme} />)}</Button>
          </PopoverHandler>
          <PopoverContent className="rounded-full z-50">
            <span>Linguagem atual: {language.theme}. Clique no botão novamente para mudar</span>
          </PopoverContent>
        </Popover>
      </Fragment>

          </div>
          <div className="p-2 ml-1 mr-1 text-4xl text-white"><BsCardList /></div>
          <div className="pl-2 pt-2 pb-2 ml-1" ><input
          className=" pt-2.5 rounded-l-xl placeholder:-translate-y-1 pl-2 pr-2 w-full"
          type="text"
          placeholder={language.theme === "pt-BR" ? ("Pesquisar") : ("Search")}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        
        </div>
        <div className="pr-2 pt-2 pb-2"><button
          className="bg-slate-400 h-9 rounded-r-xl text-2xl pl-1 pr-1 text-white"
          type="submit"
        >
          <BiSearchAlt2 />
        </button></div>
        <div className="p-1 ml-1 mr-1 text-4xl text-white"><a href="#topo"><div className="transition hover:bg-slate-500 p-1 rounded-lg"><BiUpArrowCircle /></div></a></div>
          </div>
        </div>
    </div>
    </>
  );
};

export default Navbar;

function primeiraPagina(arg0: number) {
  throw new Error("Function not implemented.");
}
