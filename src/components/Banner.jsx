import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Banner = ({ setMovieId }) => {
    const [data, setData] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'
    const [updated, setUpdated] = useState(false)
    const fetchPopular = async () => {
        const options = {
            url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            }
        }
        try {
            const res = await axios.request(options)
            const data = res.data.results
            setData(data)
            setUpdated(!updated)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPopular()
    }, [updated])


    return (
        <div className='container w-75 py-5'>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner ">
                    <Link to={'/details/603692'} onClick={()=> setMovieId(603692)} key={1}>
                        <div className="carousel-item active">
                            <img src={`${imageBaseUrl}/h8gHn0OzBoaefsYseUByqsmEDMY.jpg`} className='d-block w-100 rounded' height={600} />
                            <div className="carousel-caption d-none d-md-block px-1 rounded" style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                            }}>
                                <h4 className='fw-bolder'>John Wick: Chapter 4</h4>
                                <p className='text-white mb-0'>With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.</p>
                                <i className="fa-solid fa-star position-absolute d-flex" style={{
                                    color: '#fca311',
                                    top: 10,
                                    right: 10
                                }}><h6 className='ms-1'>7.9</h6></i>
                            </div>
                        </div>
                    </Link>
                    {data.map((item) => {
                        return (
                            <Link to={`/details/${item.id}`} onClick={()=>setMovieId(item.id)} key={item.id}>
                                <div className="carousel-item" >
                                    <img src={`${imageBaseUrl}${item.backdrop_path}`} className='d-block w-100 rounded' height={600} />
                                    <div className="carousel-caption d-none d-md-block px-1 rounded" style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                                    }}>
                                        <i className="fa-solid fa-star position-absolute d-flex" style={{
                                            color: '#fca311',
                                            top: 10,
                                            right: 10
                                        }}><h6 className='ms-1'>{item.vote_average}</h6></i>
                                        <h4 className='fw-bolder'>{item.original_title}</h4>
                                        <p className='mb-0'>{item.overview}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Banner