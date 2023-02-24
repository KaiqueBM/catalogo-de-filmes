import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { ThemeContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const imageUrl = "https://image.tmdb.org/t/p/w1280/";
const imageUrlFull = "https://image.tmdb.org/t/p/w1280/";

const MovieHeader = ({movies}: any, {data}: any) => {

    

    const language = useContext(ThemeContext)

  return (
    
  )
}

export default MovieHeader