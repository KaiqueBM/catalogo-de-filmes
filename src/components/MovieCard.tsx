import { Link } from "react-router-dom";

import { ThemeContext } from "../context/LanguageContext";

import { useState, useContext } from "react";
import {Bar} from "./Bar";

const imageUrl = "https://image.tmdb.org/t/p/w1280/";
const imageUrlFull = "https://image.tmdb.org/t/p/w1280/";

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

const MovieCard = ({ movies }: any) => {
  const language = useContext(ThemeContext);
  const [data, setData] = useState<Movies | null>();
  const childToParent = (movie: any) => {
    setData(movie);
  };

  return (
    <>
      <div className="relative flex md:flex-row flex-col justify-center md:h-530">
        <img
          className="absolute w-full object-cover opacity-10 md:h-530 h-full transition"
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
          <div className="uppercase font-bold sm:text-5xl text-4xl p-4 z-10">
            {!data ? movies[0].title : data.title}
          </div>
          <hr className="ml-4 mr-4 z-10"></hr>
          <div className="p-4 font-light">
            {!data ? movies[0].overview : data.overview}
          </div>
          <div className="z-10">
            {!data ? (
              <Link to={`/movie/${movies[0].id}`}>
                <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 hover:bg-white hover:text-black transition md:mb-0 mb-5">
                  {language.theme === "pt-BR" ? (
                    <span>DETALHES</span>
                  ) : (
                    <span>DETAILS</span>
                  )}
                </button>
              </Link>
            ) : (
              <Link to={`/movie/${data.id}`}>
                <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 hover:bg-white hover:text-black transition md:mb-0 mb-5">
                  {language.theme === "pt-BR" ? (
                    <span>DETALHES</span>
                  ) : (
                    <span>DETAILS</span>
                  )}
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="absolute w-full h-96 bottom-0 left-0 text-white bg-gradient-to-t from-zinc-800"></div>
      </div>

                    
      <Bar />

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
              className="hover:transform hover:scale-105 transition lg:w-3/12 sm:w-2/6 w-6/12 p-4"
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
                <p className="text-center  text-white font-semibold pt-2 pb-5 text-xl whitespace-pre-line">
                  {movie.title}
                </p>
              </a>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MovieCard;
