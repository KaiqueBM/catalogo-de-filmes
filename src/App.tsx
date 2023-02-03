import {Outlet} from "react-router-dom"
import Navbar from "./components/Navbar"

import './App.css'

import Background from './assets/Fundo.png';

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${Background})`,
  backgroundSize: 'auto',
  backgroundRepeat: 'no-repeat'
};

function App() {

  

  return (
    <div className="App">
      <Navbar />
      <div style={{
              background: `url(${Background})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
        <Outlet />
      </div>
      
    </div>
  )
}

export default App
