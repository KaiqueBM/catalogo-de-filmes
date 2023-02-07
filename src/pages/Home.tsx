import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
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

  const [data, setData] = useState<Movies | null>();
  const childToParent = (movie: any) => {
    setData(movie);
  };

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
      
      {movies.length > 0 && (
        <div
          className="relative flex md:flex-row flex-col justify-center md:h-530"
          id="teste"
        >
          <img
            className="absolute w-full object-cover ml-4 mr-4 opacity-10 md:h-530 h-full transition"
            src={
              !data
                ? imageUrlFull + movies[0].backdrop_path
                : imageUrlFull + data.backdrop_path
            }
          />
          <img
            className="ml-4 mr-4 rounded-2xl mt-5 mb-5 opacity-100 z-10 hover:scale-105 transition md:w-min w-6/12"
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
                  <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 hover:bg-white hover:text-black transition">
                    {language.theme === "pt-BR" ? (<span>DETALHES</span>) : (<span>DETAILS</span>)}
                  </button>
                </Link>
              ) : (
                <Link to={`/movie/${data.id}`}>
                  <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 hover:bg-white hover:text-black transition">
                    {language.theme === "pt-BR" ? (<span>DETALHES</span>) : (<span>DETAILS</span>)}
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="absolute w-full h-96 bottom-0 left-0 text-white bg-gradient-to-t from-zinc-800"></div>
        </div>
      )}

      <div className=" bg-zinc-200">
        <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-zinc-800">
          <span className="border-b-4 border-t-4 border-slate-700">
            
            {language.theme === "pt-BR" ? (<span>GENEROS</span>) : (<span>GENRES</span>)}
          </span>
        </div>
        <div className="flex flex-row flex-wrap justify-center mt-5 pb-5">
          {genreList.map(({ id, name }: Genres) => (
            <div key={id} className="text-2xl text-black ml-1 mr-1">
              <Link to={`/genre/${name}/${id}`}>
                <button className="bg-slate-200 pl-4 pr-4 rounded-full border-2 border-slate-400 mt-1 mb-1 transition hover:bg-white hover:border-slate-200">
                  {name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-b-4 mb-10 border-zinc-800">
        <span className="border-b-4 border-t-4 border-slate-700">
          
          {language.theme === "pt-BR" ? (<span>Filmes mais populares do momento</span>) : (<span>Most popular movies of the moment</span>)}
        </span>
      </div>

      <div
        className="flex flex-row flex-wrap justify-center w-full"
        onMouseEnter={childToParent}
      >
        {movies.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          movies.map((movie: Movies) => (
            <div
              key={movie.id}
              className="ml-5 mr-5 hover:transform hover:scale-105 transition whitespace-nowrap md:w-2/12 w-6/12"
              onMouseEnter={() => {
                childToParent(movie);
              }}
            >
              <a href="#topo">
                <img
                  className="rounded-2xl "
                  src={imageUrl + movie.poster_path}
                  alt={movie.title}
                />
                <p className="text-center text-white font-semibold pt-2 pb-5 text-xl whitespace-pre-line">
                  {movie.title}
                </p>
              </a>
            </div>
          ))
        )}
      </div>

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
