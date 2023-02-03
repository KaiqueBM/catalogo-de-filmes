import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import { useEffect, useState } from 'react';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({movie, showLink=true, }:any) => {
  

  const childToParent = () => {
    const esse = movie
    movie(esse)
  }

  const teste = (e:any) => {
    e.preventDefault();
    console.log("teste")
  }


  return (
    
    <div className='ml-5 mr-5 hover:transform hover:scale-105 transition whitespace-nowrap md:w-2/12 w-6/12' onMouseEnter={childToParent} onClick={teste}>
        <img className='rounded-2xl' src={imageUrl + movie.poster_path} alt={movie.title} />
        <p className='text-center text-white font-semibold pt-2 pb-5 text-xl whitespace-pre-line' >{movie.title}</p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
    
  )
}

export default MovieCard