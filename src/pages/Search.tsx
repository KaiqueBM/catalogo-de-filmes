import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { ThemeContext } from "../context/LanguageContext";

const searchURL = "https://api.themoviedb.org/3/search/movie";
const apiKey = "api_key=699f83f2ccaef388106eac2b4c22ea0f";
const imageUrl = "https://image.tmdb.org/t/p/original/";
const imageUrlFull = "https://image.tmdb.org/t/p/original/";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<any>([]);
  const query = searchParams.get("q");

  const language = useContext(ThemeContext)

  const getSearchMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)

    setMovies(data.results);
  };

  const [data, setData] = useState<any>("");
  const childToParent = (movie: any) => {
    setData(movie);
    console.log(data);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&language=${language.theme}&query=${query}`;
    getSearchMovies(searchWithQueryURL);
  }, [query]);

  useEffect(()=>{
    const updateUrlTheme = `${searchURL}?${apiKey}&language=${language.theme}&query=${query}`;
    getSearchMovies(updateUrlTheme);
  }, [language.theme]);

  console.log(movies)

  return (
    <div className="">
      

      <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-b-4 mb-10 border-zinc-800">
        <span className="md:border-b-4 md:border-t-4 border-slate-700">
          {language.theme === "pt-BR" ? (<span>Resultados da busca por: {query}</span>) : (<span>Search results for: {query}</span>)}
        </span>
      </div>
      {movies.length === 0 ? (
          <p>Carregando...</p>
        ) : (<MovieCard movies={movies} />)}
    </div>
  );
};

export default Search;
