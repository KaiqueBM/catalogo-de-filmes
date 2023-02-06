import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  function paginaInicial() {
    primeiraPagina(1);
  }

  return (
    <nav
      className="flex flex-row justify-between items-center bg-slate-700 h-14 border-b-4 border-slate-200"
      id="topo"
    >
      <div className="text-slate-200 font-bold text-3xl ml-5 hover:text-white transition">
        <Link to="/" className="flex" onClick={paginaInicial}>
          <span className="ml-1 -mt-1">CATÁLOGO DE FILMES</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="mr-5">
        <input
          className="border-2 border-slate-400 rounded-full bg-slate-200 placeholder:text-black placeholder:text-center p-1.5 pb-0.5 w-60 pl-5 pr-5 hover:bg-white hover:border-slate-200 transition"
          type="text"
          placeholder="Busque um filme :)"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="border-2 border-slate-400 bg-slate-200 rounded-full p-2 ml-2 hover:bg-white hover:border-slate-200 transition"
          type="submit"
        >
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;

function primeiraPagina(arg0: number) {
  throw new Error("Function not implemented.");
}
