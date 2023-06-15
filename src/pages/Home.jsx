import React, { useEffect, useState } from "react"
import Banner from "../components/Banner"
import Header from "../components/Header"
import SwiperCard from "../components/SwiperCard"
import axios from "axios"
import CardGenres from "../components/CardGenres"

const Home = () => {
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')
    const [genreName, setGenreName] = useState('Action')
    const [genrePage, setGenrePage] = useState(1)


    const fetchFilmData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            },
            url: 'https://api.themoviedb.org/3/genre/movie/list?language=en'
        }

        try {
            const res = await axios.request(options)
            const data = res.data.genres
            setGenres(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGenreClick = (id, name) => {
        setGenreId(id)
        setGenreName(name)
        setGenrePage(1)
    }

    

    useEffect(() => {
        fetchFilmData()
    }, [])

    return (
        <div>
            <Header act1={'text-danger'} />
            <div className="py-3 ">
                <div className="" style={{
                    marginTop: '2%'
                }}>
                    <Banner />

                    <div className="container my-3 text-white">
                        <h4 className="mb-3">What's New</h4>
                        <SwiperCard />
                    </div>

                    <div className="container py-3 text-white w-100 d-flex flex-row">
                        <h4 className="mb-3 me-3">Film List</h4>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle btn-sm text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{
                                backgroundColor: '#fca311'
                            }}>
                                Genres
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                {genres.map((item) => {
                                    return (
                                        <li><a className="dropdown-item btn" key={item.id} onClick={() => {
                                            handleGenreClick(item.id, item.name)
                                        }}>{item.name}</a></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="py-2 container">
                        <div className="d-flex justify-content-between">
                            <h4 className="mb-3 me-3 text-white">Genre : {genreName}</h4>
                            <h4 className="mb-3 me-3 text-white">Pages : {genrePage}</h4>
                        </div>
                        <CardGenres genreId={genreId} genreName={genreName} genrePages={genrePage} setGenrePage={setGenrePage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home