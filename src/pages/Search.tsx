import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

//import './MoviesGrid.css'

const searchURL = 'https://api.themoviedb.org/3/movie/'
const apiKey = 'api_key=699f83f2ccaef388106eac2b4c22ea0f'
const imageUrl = "https://image.tmdb.org/t/p/original/"
const imageUrlFull = 'https://image.tmdb.org/t/p/original/'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState<any>([]);
  const query = searchParams.get("q");


  const getSearchMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results)
  }

  const [data, setData] = useState<any>('');
  const childToParent = (movie:any) => {
    setData(movie)
    console.log(data)
  }

  useEffect(()=>{
    
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    getSearchMovies(searchWithQueryURL);
  }, [query])

  return (
    <div className="">


{movies.length > 0 && (
      <div className="relative flex flex-row justify-center h-530" id="teste">
        <img className="absolute w-screen object-cover ml-4 mr-4 opacity-10 h-530" src={!data ? (imageUrlFull + movies[0].backdrop_path) : (imageUrlFull + data.backdrop_path)} />
        <img className="ml-4 mr-4  rounded-2xl mt-5 mb-5 opacity-100 z-10 hover:scale-105 transition" src={!data ? (imageUrlFull + movies[0].poster_path) : (imageUrlFull + data.poster_path)} />
        <div className="w-5/12 ml-4 mr-4 mt-5 text-white flex flex-col justify-center text-center">
          <div className="uppercase font-semibold text-4xl p-4 z-10">{!data ? (movies[0].title) : (data.title)}</div>
          <hr className="ml-4 mr-4 z-10"></hr>
          <div className="p-4">{!data ? (movies[0].overview) : (data.overview)}</div>
          <div className="z-10">
          {!data ? (
              <Link to={`/movie/${movies[0].id}`}>
                <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3">DETALHES</button>
              </Link>   
            ) : (
              <Link to={`/movie/${data.id}`}>
                <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3">DETALHES</button>
              </Link>
              )}
          </div>
        </div>
        <div className="absolute w-screen h-96 bottom-0 left-0 text-white bg-gradient-to-t from-zinc-800"></div>
      </div>
    )}



      <div className="text-center text-4xl font-bold text-zinc-800 uppercase p-5 bg-white border-b-4 mb-10 border-zinc-800">
        <span className="border-b-4 border-t-4 border-slate-700">Resultados: {query}</span>
      </div>
      <div className="flex flex-row flex-wrap justify-center w-screen" onMouseEnter={childToParent}>
        {movies.length === 0 ? (<p>Carregando...</p>) : (
          movies.map((movie:any)=> (
            
            <div key={movie.id} className='ml-5 mr-5 hover:transform hover:scale-105 transition whitespace-nowrap md:w-2/12 w-6/12' onMouseEnter={(()=>{childToParent(movie)})}>
                <a href="#topo">
                <img className='rounded-2xl' src={imageUrl + movie.poster_path} alt={movie.title} />
                <p className='text-center text-white font-semibold pt-2 pb-5 text-xl whitespace-pre-line' >{movie.title}</p>
                </a>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default Search