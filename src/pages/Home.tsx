import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieHeader from "../components/MovieHeader";
import { ThemeContext } from "../context/LanguageContext";


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

  const [pagination, setPagination] = useState<number>(1);
  function proximaPagina() {
    setPagination((prev: number) => prev + 1);
  }
  function voltarPagina() {
    setPagination((prev: number) => prev - 1);
  }
  function primeiraPagina(number: number) {
    setPagination(number);
  }

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
  

      <div className=" bg-zinc-200">
        <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-zinc-800">
          <span className="md:border-b-4 md:border-t-4 border-slate-700">
            
            {language.theme === "pt-BR" ? (<span>GENEROS</span>) : (<span>GENRES</span>)}
          </span>
        </div>
        <div className="flex flex-row flex-wrap justify-center mt-5 pb-5">
          {genreList.map(({ id, name }: Genres) => (
            <div key={id} className="md:text-2xl text-xl text-black ml-1 mr-1">
              <Link to={`/genre/${name}/${id}`}>
                <button className="bg-slate-200 pl-4 pr-4 rounded-xl border-2 border-slate-300 mt-1 mb-1 transition hover:bg-white hover:border-slate-200">
                  {name}
                </button>
              </Link>
            </div>
          ))}
        </div>
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

export default Home;
