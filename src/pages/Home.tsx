import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
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
    <>
      {movies.length === 0 ? (
          <p>Carregando...</p>
        ) : (<MovieCard movies={movies} />)}

      <Footer />
    </>
  );
};

export default Home;
