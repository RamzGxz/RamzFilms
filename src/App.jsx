import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindMovie from './pages/FindMovie'
import { useState } from 'react'
import MovieDetails from './pages/MovieDetails'
import TableList from './pages/TableList'
import DetailsCast from './pages/DetailsCast'
import About from './pages/About'

function App() {
  const [movieId, setMovieId] = useState(0)
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home setMovieId={setMovieId} />} />
        <Route path='/findMovie' element={<FindMovie setMovieId={setMovieId} />} />
        <Route path='/details/:movieId' element={<MovieDetails/>} />
        <Route path='/movie/list' element={<TableList/>} />
        <Route path='/cast-details/:castId' element={<DetailsCast/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
