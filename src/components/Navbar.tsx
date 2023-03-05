import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2, BiUpArrowCircle } from "react-icons/bi";

import {
  BsFillHouseFill,
  BsCardList,
  BsArrowRightShort,
  BsArrowLeftShort,
} from "react-icons/bs";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/LanguageContext";
import { PaginationContext } from "../context/PaginationContext";

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
  MenuItem,
} from "@material-tailwind/react";

import { BsToggleOff, BsToggleOn } from "react-icons/bs";

interface Genres {
  id: number;
  name: string;
}
[];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const language = useContext(ThemeContext);
  const { pagination, proximaPagina, voltarPagina, primeiraPagina } =
    useContext(PaginationContext);

  const apiKey = "api_key=699f83f2ccaef388106eac2b4c22ea0f";
  const apiGenreURL = "https://api.themoviedb.org/3/genre/movie/list";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const [genreList, setGenreList] = useState<any>([]);
  const [genreUpdate, setGenreUpdate] = useState<any>(0);

  const getGenreList = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setGenreList(data.genres);
  };

  useEffect(() => {
    const genreURL = `${apiGenreURL}?${apiKey}&language=${language.theme}`;
    getGenreList(genreURL);
  }, []);

  useEffect(() => {
    const updateGenreURL = `${apiGenreURL}?${apiKey}&language=${language.theme}`;
    getGenreList(updateGenreURL);
  }, [genreUpdate]);

  useEffect(() => {
    const updateGenreURL = `${apiGenreURL}?${apiKey}&language=${language.theme}`;
    getGenreList(updateGenreURL);
  }, [language.theme]);

  return (
    <>
      <div id="topo"></div>
      <div className="fixed bottom-0 mx-auto sm:h-12 sm:mb-5 w-full z-50">
        <div className="flex flex-row justify-center">
          <div className="bg-slate-600 flex flex-row md:pl-5 md:pr-5 pl-2 pr-2 sm:rounded-2xl justify-center sm:w-max w-full sm:p-1 p-2 sm:gap-1 gap-2 sm:border-0 border-t-2">
            <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white">
              <Link to="/" className="flex" onClick={primeiraPagina}>
                <Tooltip
                  content="Página inicial"
                  className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
                >
                  <div className="transition hover:bg-slate-500 p-1 rounded-lg cursor-pointer">
                    <BsFillHouseFill />
                  </div>
                </Tooltip>
              </Link>
            </div>
            <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white">
              <Tooltip
                content={language.theme}
                className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
              >
                <Button
                  variant="gradient"
                  className="transition hover:bg-slate-500 p-1 rounded-lg"
                >
                  {language.theme === "pt-BR" ? (
                    <BsToggleOff
                      className=" hover:transition-all"
                      onClick={language.toggleTheme}
                    />
                  ) : (
                    <BsToggleOn
                      className="hover:transition-all"
                      onClick={language.toggleTheme}
                    />
                  )}
                </Button>
              </Tooltip>
            </div>
            <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white">
              <Tooltip
                content="Gêneros"
                className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
              >
                <div className="transition hover:bg-slate-500 pt-1 pl-1 pr-1 rounded-lg cursor-pointer">
                  <Menu>
                    <MenuHandler>
                      <Button variant="gradient">
                        <BsCardList />
                      </Button>
                    </MenuHandler>
                    <MenuList className="z-10 rounded-lg grid grid-cols-2 -mt-3 text-center">
                      {genreList.map(({ id, name }: Genres) => (
                        <div
                          key={id}
                          className=" text-black ml-1 mr-1 mt-0.5 mb-0.5"
                        >
                          <Link to={`/genre/${name}/${id}`}>
                            <button className="bg-slate-200 w-full m-0.5 transition duration-300 hover:bg-slate-300 rounded-lg hover:font-semibold">
                              <MenuItem className="">{name}</MenuItem>
                            </button>
                          </Link>
                        </div>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
              </Tooltip>
            </div>
            <>
              <form onSubmit={handleSubmit} className="flex flex-row">
                <div className="sm:pl-2 pt-2 sm:pb-2 md:ml-1 md:inline hidden">
                  <input
                    className=" pt-2.5 rounded-l-xl placeholder:-translate-y-1 pl-2 pr-2 w-full"
                    type="text"
                    placeholder={
                      language.theme === "pt-BR" ? "Pesquisar" : "Search"
                    }
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                </div>
                <div className="pr-2 pt-2 pb-2 md:mr-1 md:inline hidden border-r-2">
                  <button
                    className="bg-slate-400 h-9 rounded-r-xl text-2xl pl-1 pr-1 text-white"
                    type="submit"
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>
              </form>
            </>

            <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white inline md:hidden border-r-2">
              <Tooltip
                content="Pesquisar"
                className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
              >
                <div className="transition hover:bg-slate-500 pt-1 pl-1 pr-1 rounded-lg cursor-pointer">
                  <Fragment>
                    <Popover placement="top">
                      <PopoverHandler>
                        <Button variant="gradient">
                          <BiSearchAlt2 />
                        </Button>
                      </PopoverHandler>
                      <PopoverContent className="rounded-xl z-50 w-11/12 flex flex-row justify-center -mt-2">
                        <form onSubmit={handleSubmit} className="flex flex-row">
                          <div>
                            <input
                              className="bg-slate-200 h-9 rounded-l-xl placeholder:pl-2 placeholder:pr-2"
                              type="text"
                              placeholder={
                                language.theme === "pt-BR"
                                  ? "Pesquisar"
                                  : "Search"
                              }
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                            />
                          </div>
                          <div>
                            <button
                              className="bg-slate-400 h-9 rounded-r-xl text-2xl text-white pl-2 pr-2"
                              type="submit"
                            >
                              <BiSearchAlt2 />
                            </button>
                          </div>
                        </form>
                      </PopoverContent>
                    </Popover>
                  </Fragment>
                </div>
              </Tooltip>
            </div>

            {pagination <= 1 ? (
              <></>
            ) : (
              <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white">
                <Tooltip
                  content="Voltar página"
                  className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
                >
                  <div
                    className="transition hover:bg-slate-500 p-1 rounded-lg"
                    onClick={voltarPagina}
                  >
                    <BsArrowLeftShort />
                  </div>
                </Tooltip>
              </div>
            )}
            <div className="p-0 sm:text-4xl text-3xl text-white">
              <Tooltip
                content="Página atual"
                className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
              >
                <div className="transition hover:bg-slate-500 mt-1 pb-1 pl-1 pr-1 rounded-lg">
                  {pagination}
                </div>
              </Tooltip>
            </div>
            <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white">
              <Tooltip
                content="Próxima página"
                className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
              >
                <div
                  className="transition hover:bg-slate-500 p-1 rounded-lg"
                  onClick={proximaPagina}
                >
                  <BsArrowRightShort />
                </div>
              </Tooltip>
            </div>
            <div className="sm:p-1 pt-1 md:ml-1 md:mr-1 sm:text-4xl text-3xl text-white border-l-2">
              <a href="#topo">
                <Tooltip
                  content="Ir para o topo"
                  className="bg-white -mt-1 pl-3 pr-3 text-black rounded-full z-50"
                >
                  <div className="transition hover:bg-slate-500 p-1 rounded-lg">
                    <BiUpArrowCircle />
                  </div>
                </Tooltip>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
