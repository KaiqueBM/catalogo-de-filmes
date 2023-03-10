import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import "./styles/global.css"



import {BrowserRouter, Routes, Route} from "react-router-dom"

import App from './App'
import Search from './pages/Search'
import Movie from './pages/Movie'
import Home from './pages/Home'
import Genre from './pages/Genre'
import { ThemeProvider } from './context/LanguageContext'
import { PaginationProvider } from './context/PaginationContext'





ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <PaginationProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/genre/:name/:id" element={<Genre />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
        </PaginationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
