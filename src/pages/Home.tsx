import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { ThemeContext } from "../context/LanguageContext";
import { PaginationContext } from "../context/PaginationContext";


const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "api_key=699f83f2ccaef388106eac2b4c22ea0f";
const imageUrl = "https://image.tmdb.org/t/p/w1280/";
const imageUrlFull = "https://image.tmdb.org/t/p/w1280/";

interface Genres {
  id: number;
  name: string;
}
[];

interface Movies {
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: [number];
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
}

const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const [genreList, setGenreList] = useState<any>([]);

  const language = useContext(ThemeContext)
  const {pagination, proximaPagina, voltarPagina} = useContext(PaginationContext)

  const getMoviesList = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  const getGenreList = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setGenreList(data.genres);
  };

  const data = null



  useEffect(() => {
    const updateUrl = `${moviesURL}popular?${apiKey}&language=${language.theme}&page=${pagination}`;
    getMoviesList(updateUrl);
  }, [pagination]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    const apiMoviesURL = `${moviesURL}popular?${apiKey}&language=${language.theme}&page=1`;
    getMoviesList(apiMoviesURL);
    const genreURL =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=699f83f2ccaef388106eac2b4c22ea0f&language=pt-BR";
    getGenreList(genreURL);
  }, []);

  useEffect(()=>{
    const updateUrlTheme = `${moviesURL}popular?${apiKey}&language=${language.theme}&page=${pagination}`;
    getMoviesList(updateUrlTheme);
    const updateGenreURL =
      `https://api.themoviedb.org/3/genre/movie/list?api_key=699f83f2ccaef388106eac2b4c22ea0f&language=${language.theme}`;
    getGenreList(updateGenreURL);
  }, [language.theme]);




  return (
    <div className="">


     

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

export default Home;
