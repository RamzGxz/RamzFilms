import React, { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import '../styles/cardGenres.css'
import Loader from './Loader';
import { Link } from 'react-router-dom';

const LazyGenresImages = lazy(() => import('./LazyGenresImages'))

const CardMovie = ({ genreId, genreName, genrePages, genrePage, setGenrePage, setMovieId }) => {
    const [movieDataGenres, setMovieDataGenres] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

    const pageHandleClick = () => {
        setGenrePage(genrePages + 1)
        if (movieDataGenres.length <= genrePage) {
            setGenrePage(1)
        } else {
            setGenrePage(genrePage)
        }
    }

    const fetchData = async () => {
        const options = {
            url: 'https://api.themoviedb.org/3/discover/movie',
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            },
            params: {
                with_genres: genreId,
                page: genrePages
            }
        }
        try {
            const res = await axios.request(options)
            const data = res.data.results
            setMovieDataGenres(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [movieDataGenres, genrePage])
    return (
        <div>
            <div className='row'>
                <Suspense fallback={<Loader />}>
                    {movieDataGenres.map((item) => {
                        return (
                            <div className='col m-auto px-0 d-flex px-2 py-2 col-sm-12 col-lg-3 col-md-4' key={item.id}>
                                <Link to={`/details/${item.id}`} onClick={()=> setMovieId(item.id)}>
                                    <div className="card p-0">
                                        <div className='container d-flex align-items-center position-absolute py-2 justify-content-between'>
                                            <h6 className='mb-0 p-1 rounded' style={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                color: '#fca311',
                                                fontSize: '10px',
                                            }}>{genreName}</h6>
                                            <i className="fa-solid fa-star d-flex justify-content-center align-items-center p-1 rounded" style={{
                                                color: '#fca311',
                                                fontSize: '10px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            }}>
                                                <h6 className='ms-1 mb-0' style={{
                                                    fontSize: '10px'
                                                }}>{item.vote_average}</h6>
                                            </i>
                                        </div>
                                        <Suspense fallback={<Loader />}>
                                            <LazyGenresImages src={`${imageBaseUrl}${item.poster_path}`} alt={`${item.original_title}`} />
                                        </Suspense>
                                        <div className='px-2 py-2 position-absolute bottom-0 z-1 bg-dark text-white container'>
                                            <h5 className='fw-bolder mb-0 card-titleCont text-center'>{item.title}</h5>
                                        </div>
                                        <div className="card-body position-absolute bg-dark text-white bottom-0 card-content d-flex align-items-center m-auto flex-column z-3">
                                            <h5 className='card-title fw-bolder text-center'>{item.title}</h5>
                                            <p className="card-text text-wrap w-100" style={{
                                                textAlign: 'justify'
                                            }}>{item.overview}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </Suspense>
            </div>
            <div className="container w-100 mt-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mb-0">
                        <li className="page-item">
                            <button className="btn bg-danger rounded-0 rounded-start-3 page-link" href="#" aria-label="Previous" onClick={() => pageHandleClick()}>
                                <span aria-hidden="true" className="text-white fs-6">«</span>
                            </button>
                        </li>
                        {movieDataGenres.map((item, data) => {
                            return (
                                <li className="page-item"><button className="btn rounded-0 fs-6 page-link bg-danger text-white" href="#" onClick={() => setGenrePage(data + 1)}>{data + 1}</button></li>
                            )
                        })}
                        <li className="page-item">
                            <button className="btn bg-danger rounded-0 rounded-end-3 fs-6 page-link" href="#" aria-label="Next" onClick={() => pageHandleClick()}>
                                <span aria-hidden="true" className="text-white fs-6">»</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                {/* <Loader/> */}
            </div>

        </div>
    );
};

export default CardMovie;