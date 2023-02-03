import {Link, useNavigate} from "react-router-dom"
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"

import './Navbar.css'
import { useState } from "react"

const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e:any)=> {
        e.preventDefault();
        if(!search) return

        navigate(`/search?q=${search}`);
        setSearch("");
    }


  return (
    <nav className="flex flex-row justify-between items-center bg-slate-700 h-14" id="topo">
        <div className="text-slate-400 font-bold text-3xl ml-5">
        <Link to="/" className="flex">
          <BiCameraMovie />
          <span className="ml-1 -mt-1">CATÁLOGO DE FILMES</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="mr-5">
            <input className="border-2 border-slate-100 rounded-full bg-slate-300 placeholder:text-black placeholder:text-center p-1.5 w-60" type="text" placeholder="Busque um filme" onChange={(e)=> setSearch(e.target.value)} value={search} />
            <button className="border-2 border-slate-100 bg-slate-500 rounded-full p-2 ml-2" type="submit"><BiSearchAlt2 /></button>
        </form>
    </nav>
  )
}

export default Navbar