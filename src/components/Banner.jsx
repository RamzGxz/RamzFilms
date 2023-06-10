import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Banner = () => {
    const [data, setData] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

    const fetchPopular = async () => {
        const options = {
            url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=3',
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
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPopular()
    }, [])

    return (
        <div className='container'>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner ">
                    <div className="carousel-item active">
                        <img src={`${imageBaseUrl}/h8gHn0OzBoaefsYseUByqsmEDMY.jpg`} className='d-block w-100 rounded' height={600} />
                        <div class="carousel-caption d-none d-md-block px-1 rounded" style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                                }}>
                            <h4 className='fw-bolder'>John Wick: Chapter 4</h4>
                            <p className='text-white mb-0'>With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.</p>
                        </div>
                    </div>
                    {data.map((item) => {
                        return (
                            <div className="carousel-item" key={item.id}>
                                <img src={`${imageBaseUrl}${item.backdrop_path}`} className='d-block w-100 rounded' height={600}/>
                                <div class="carousel-caption d-none d-md-block px-1 rounded" style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)'
                                }}>
                                    <h4 className='fw-bolder'>{item.original_title}</h4>
                                    <p className='mb-0'>{item.overview}</p>
                                </div>
                            </div>
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