import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FindMovie from './pages/FindMovie'
import { useState } from 'react'
import MovieDetails from './pages/MovieDetails'

function App() {

  const [movieId, setMovieId] = useState(0)
  console.log(movieId)
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home setMovieId={setMovieId} />} />
        <Route path='/findMovie' element={<FindMovie setMovieId={setMovieId} />} />
        <Route path='/details/:id' element={<MovieDetails id={movieId} />} />
      </Routes>
    </div>
  )
}

export default App
