import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2, BiUpArrowCircle } from "react-icons/bi";

import {BsFillHouseFill, BsSearch, BsCardList} from "react-icons/bs";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/LanguageContext";

import { Tooltip } from "@material-tailwind/react";


import { Fragment } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";

import {BsToggleOff, BsToggleOn} from 'react-icons/bs'

interface Genres {
  id: number;
  name: string;
}
[];

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "api_key=699f83f2ccaef388106eac2b4c22ea0f";

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

  const [genreList, setGenreList] = useState<any>([]);

  const getGenreList = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setGenreList(data.genres);
  };

  useEffect(() => {
    const genreURL =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=699f83f2ccaef388106eac2b4c22ea0f&language=pt-BR";
    getGenreList(genreURL);
  }, []);

  useEffect(()=>{
    const updateGenreURL =
      `https://api.themoviedb.org/3/genre/movie/list?api_key=699f83f2ccaef388106eac2b4c22ea0f&language=${language.theme}`;
    getGenreList(updateGenreURL);
  }, [language.theme]);

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
          <div className="p-1 ml-1 mr-1 text-4xl text-white"><Tooltip content="Página inicial" className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"><div className="transition hover:bg-slate-500 p-1 rounded-lg cursor-pointer"><BsFillHouseFill /></div></Tooltip></div>
          <div className="p-1 ml-1 mr-1 text-4xl text-white">

          <Tooltip content={language.theme} className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50">

            <Button variant="gradient" className="transition hover:bg-slate-500 p-1 rounded-lg">{language.theme === "pt-BR" ? (<BsToggleOff className=" hover:transition-all" onClick={language.toggleTheme} />) : (<BsToggleOn className="hover:transition-all" onClick={language.toggleTheme} />)}</Button>

        </Tooltip>
      

          </div>
          <div className="p-1 ml-1 mr-1 text-4xl text-white">
          <Tooltip content='Gêneros' className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50">
          <div className="transition hover:bg-slate-500 p-1 rounded-lg cursor-pointer">
          <Menu>
      <MenuHandler>
        <Button variant="gradient"><BsCardList /></Button>
      </MenuHandler>
      <MenuList className="z-80">
      {genreList.map(({ id, name }: Genres) => (
            <div key={id} className="md:text-2xl text-xl text-black ml-1 mr-1">
              <Link to={`/genre/${name}/${id}`}>
                <button className="bg-slate-200 pl-4 pr-4 rounded-xl border-2 border-slate-300 mt-1 mb-1 transition hover:bg-white hover:border-slate-200">
                  {name}
                </button>
              </Link>
            </div>
          ))}
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
            
            </div>
            </Tooltip>
            </div>
          <div className="pl-2 pt-2 pb-2 ml-1 md:inline hidden" ><input
          className=" pt-2.5 rounded-l-xl placeholder:-translate-y-1 pl-2 pr-2 w-full"
          type="text"
          placeholder={language.theme === "pt-BR" ? ("Pesquisar") : ("Search")}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        
        </div>
        <div className="pr-2 pt-2 pb-2 md:inline hidden"><button
          className="bg-slate-400 h-9 rounded-r-xl text-2xl pl-1 pr-1 text-white"
          type="submit"
        >
          <BiSearchAlt2 />
        </button></div>
        <div className="p-2 ml-1 mr-1 text-4xl text-white"><BiSearchAlt2 /></div>
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
