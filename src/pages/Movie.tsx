import { useState, useEffect } from "react"
import {Link, useParams} from "react-router-dom"

import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsCameraReels,
  BsCalendar3,
  BsStarFill,
  BsStarHalf,
  BsStar
} from 'react-icons/bs'

import MovieCard from "../components/MovieCard"

//import './Movie.css'

const moviesURL = 'https://api.themoviedb.org/3/movie/'
const apiKey = 'api_key=699f83f2ccaef388106eac2b4c22ea0f'

const imageUrl = "https://image.tmdb.org/t/p/original/"
const imageUrlFull = 'https://image.tmdb.org/t/p/original/'




const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState<any>(null)

  const getMovie = async(url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data)
  }

  const formatCurrency = (number:number)=> {
    return number.toLocaleString("en-US",{
      style: "currency",
      currency: "USD"
    })
  }

  useEffect(()=>{
    const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`
    getMovie(movieUrl)
  }, [])

  interface genres{
    id: number,
    name: string
  }[];

  return (
    <div className="bg-zinc-800 h-screen">{movie && (
    <>
      <img
            className="absolute w-screen object-cover opacity-10 h-screen"
            src={imageUrlFull + movie.backdrop_path}
          />
      
      <div className="flex flex-row justify-center container mx-auto items-center h-screen">
        <img className="ml-4 mr-4  rounded-2xl mt-5 mb-5 hover:scale-105 transition w-4/12 z-10" src={imageUrlFull + movie.poster_path} />
        <div className="flex flex-col w-10/12 ml-4 mr-4">

          <div className="text-white text-3xl text-end z-10 mb-3 flex flex-row justify-end">
            {movie.vote_average === 0 && (<div className="flex flex-row"><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 1 && movie.vote_average > 0.2 && (<div className="flex flex-row"><BsStarHalf className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 2 && movie.vote_average > 1 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 3 && movie.vote_average > 2 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarHalf className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 4 && movie.vote_average > 3 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStar className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 5 && movie.vote_average > 4 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarHalf className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 6 && movie.vote_average > 5 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStar className="mr-2" /><BsStar /></div>)} 
            {movie.vote_average <= 7 && movie.vote_average > 6 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarHalf className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 8 && movie.vote_average > 7 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStar /></div>)}
            {movie.vote_average <= 9 && movie.vote_average > 8 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarHalf /></div>)}
            {movie.vote_average <= 10 && movie.vote_average > 9 && (<div className="flex flex-row"><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill className="mr-2" /><BsStarFill /></div>)}
          </div>


          <div className="flex flex-row flex-wrap z-10 justify-end">{movie.genres.map(({id, name}:genres)=>(
            <div key={id} className="ml-3 bg-slate-200 pl-3 pr-3 rounded-full">{name}</div>
          ))}</div>
          
          <div className="text-white text-6xl text-center z-10 mb-3">{movie.title}</div>
          <hr className="border-2 z-10 mb-3"></hr>
          <div className="flex flex-row z-10 text-2xl text-gray-50 uppercase"><BsCameraReels /> <span className="-mt-1 ml-2">Descrição:</span></div>
          <div className="text-gray-200 text-justify mb-3">{movie.overview}</div>

          <hr className="border-2 z-10 mb-3"></hr>
          <div className="flex flex-row z-10 text-2xl text-gray-50 uppercase"><BsHourglassSplit /> <span className="-mt-1 ml-2">Duração:</span></div>
          <div className="text-gray-200 text-justify mb-3">{movie.runtime} minutos.</div>



          <div className="flex flex-row z-10 text-2xl text-gray-50 uppercase"><BsWallet2 /> <span className="-mt-1 ml-2">Orçamento:</span></div>
          <div className="text-gray-200 text-justify mb-3">{formatCurrency(movie.budget)}</div>





          <div className="flex flex-row z-10 text-2xl text-gray-50 uppercase"><BsGraphUp /> <span className="-mt-1 ml-2">Receita:</span></div>
          <div className="text-gray-200 text-justify mb-3">{formatCurrency(movie.revenue)}</div>



          <div className="flex flex-row z-10 text-2xl text-gray-50 uppercase"><BsCalendar3 /> <span className="-mt-1 ml-2">Data de lançamento:</span></div>
          <div className="text-gray-200 text-justify mb-3">{movie.release_date}</div>


          <div className="flex flex-row z-10 text-2xl text-gray-50 uppercase"><BsStar /> <span className="-mt-1 ml-2">Nota:</span></div>
          <div className="text-gray-200 text-justify mb-3">{movie.vote_average}</div>


        <hr className="border-2 z-10 mb-3"></hr>

            <Link to={`/`} className="w-full flex flex-row justify-center z-10">
              <button className="border-2 border-white rounded-full w-2/6 p-2 mt-3 text-gray-200 hover:bg-white hover:text-black transition ">
                    VOLTAR PARA A HOME
                  </button>
                  </Link>
        
          

          
          
          
          </div>
            

            
        
      </div>
      

      
    
    </>
    )}
      
    </div>
  )
}

export default Movie