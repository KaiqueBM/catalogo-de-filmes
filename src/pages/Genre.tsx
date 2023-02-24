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
