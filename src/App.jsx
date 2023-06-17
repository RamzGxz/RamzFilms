import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindMovie from './pages/FindMovie'
import { useState } from 'react'
import MovieDetails from './pages/MovieDetails'
import TableList from './pages/TableList'

function App() {
  const [movieId, setMovieId] = useState(0)
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home setMovieId={setMovieId} />} />
        <Route path='/findMovie' element={<FindMovie setMovieId={setMovieId} />} />
        <Route path='/details/:movieId' element={<MovieDetails/>} />
        <Route path='/movie/list' element={<TableList/>} />
      </Routes>
    </div>
  )
}

export default App
