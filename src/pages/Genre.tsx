import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { ThemeContext } from "../context/LanguageContext";

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "api_key=699f83f2ccaef388106eac2b4c22ea0f";
const apiGenre = "https://api.themoviedb.org/3/discover/movie?";
const imageUrl = "https://image.tmdb.org/t/p/w1280/";
const imageUrlFull = "https://image.tmdb.org/t/p/w1280/";

const Genre = () => {
  const { id } = useParams();
  const { name } = useParams();
  const [movies, setMovies] = useState<any>([]);

  const language = useContext(ThemeContext)

  const getMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
    console.log(data.results);
  };

  const [data, setData] = useState<any>("");
  const childToParent = (movie: any) => {
    setData(movie);
    console.log(data);
  };

  const [pagination, setPagination] = useState<any>(1);

  function proximaPagina(e: any) {
    setPagination((prev: number) => prev + 1);
    console.log(pagination);
  }
  function voltarPagina(e: any) {
    setPagination((prev: number) => prev - 1);
    console.log(pagination);
  }

  useEffect(() => {
    const updateUrl = `${apiGenre}${apiKey}&language=${language.theme}&with_genres=${id}&page=${pagination}`;
    getMovies(updateUrl);
  }, [pagination]);

  useEffect(() => {
    const moviesUrl = `${apiGenre}${apiKey}&language=${language.theme}&with_genres=${id}`;
    getMovies(moviesUrl);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(()=>{
    const updateUrlTheme = `${apiGenre}${apiKey}&language=${language.theme}&with_genres=${id}&page=${pagination}`;
    getMovies(updateUrlTheme);
  }, [language.theme]);

  return (
    <div className="">
      {movies.length === 0 ? (
        <p>carregando...</p>
      ) : (
        <div
          className="relative flex md:flex-row flex-col justify-center md:h-530">
          <img
            className="absolute w-full object-cover ml-4 mr-4 opacity-10 md:h-530 h-full transition"
            src={
              !data
                ? imageUrlFull + movies[0].backdrop_path
                : imageUrlFull + data.backdrop_path
            }
          />
          <img
            className="md:ml-4 md:mr-4 rounded-2xl mt-5 md:mb-5 opacity-100 z-10 hover:scale-105 transition md:w-min w-6/12 mx-auto"
            src={
              !data
                ? imageUrlFull + movies[0].poster_path
                : imageUrlFull + data.poster_path
            }
          />
          <div className="md:w-5/12 ml-4 mr-4 mt-5 text-white flex flex-col justify-center text-center transition">
            <div className="uppercase font-semibold text-4xl p-4 z-10">
              {!data ? movies[0].title : data.title}
            </div>
            <hr className="ml-4 mr-4 z-10"></hr>
            <div className="p-4">
              {!data ? movies[0].overview : data.overview}
            </div>
            <div className="z-10">
              {!data ? (
                <Link to={`/movie/${movies[0].id}`}>
                  <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 hover:bg-white hover:text-black transition md:mb-0 mb-5">
                    {language.theme === "pt-BR" ? (<span>DETALHES</span>) : (<span>DETAILS</span>)}
                  </button>
                </Link>
              ) : (
                <Link to={`/movie/${data.id}`}>
                  <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 hover:bg-white hover:text-black transition md:mb-0 mb-5">
                    {language.theme === "pt-BR" ? (<span>DETALHES</span>) : (<span>DETAILS</span>)}
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="absolute w-full h-96 bottom-0 left-0 text-white bg-gradient-to-t from-zinc-800"></div>
        </div>
      )}

      <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-b-4 mb-10 border-zinc-800">
        <span className="md:border-b-4 md:border-t-4 border-slate-700">
          {language.theme === "pt-BR" ? (<span>Filmes do genero: {name}</span>) : (<span>Genre movies: {name}</span>)}
        </span>
      </div>

      {movies.length === 0 ? (
          <p>Carregando...</p>
        ) : (<MovieCard movies={movies} />)}

      <div className="w-full text-white bg-white border-t-4 border-slate-800">
        <div className="flex flex-row justify-center">
          <Link to="/" className="flex">
            {pagination <= 1 ? (
              <></>
            ) : (
              <button
                className="text-2xl border-4 rounded-full pl-3 pr-3 pt-1 pb-1 uppercase bg-slate-300 text-slate-700 border-slate-700 m-2 transition hover:bg-white"
                onClick={voltarPagina}
              >
                {language.theme === "pt-BR" ? (<span>Voltar página</span>) : (<span>Previous page</span>)}
              </button>
            )}
            <button className="text-2xl border-4 rounded-full pl-3 pr-3 pt-1 pb-1 bg-white text-slate-700 border-slate-700 m-2">
              {pagination}
            </button>

            <button
              className="text-2xl border-4 rounded-full pl-3 pr-3 pt-1 pb-1 uppercase bg-slate-300 text-slate-700 border-slate-700 m-2 transition hover:bg-white"
              onClick={proximaPagina}
            >
              {language.theme === "pt-BR" ? (<span>Próxima página</span>) : (<span>Next page</span>)}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Genre;
