import React, { useEffect, useState, lazy, Suspense } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/cardGenres.css'

const LazyMovieImages = lazy(() => import('../components/LazyMovieImages'))

const FindMovie = ({ setMovieId }) => {
    const listWord = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'V', 'w', 'X', 'Y', 'Z']
    const [updated, setUpdated] = useState(false) 
    const [data, setData] = useState([])
    const [query, setQuery] = useState('C')
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
    const [areData, setAreData] = useState(false)

    const fetchSearchMovie = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            },
            url: `https://api.themoviedb.org/3/search/movie?query=${query}&language=en`
        }

        try {
            const res = await axios.request(options)
            if (res.data.results && res.data.results.length > 0) {
                setData(res.data.results)
                setAreData(true)
                setUpdated(!updated)
            } else {
                setData([])
                setAreData(false)
                setUpdated(!updated)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSearchMovie()
    }, [updated])

    return (
        <div>
            <Header act3={'text-danger'}/>
            <div className='py-3'>
                <div className='container' style={{
                    marginTop: '5%'
                }}>
                    <section className="text-center container ">
                        <div className="row pb-3">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <h1 className="fw-bolder text-white">Find Movie</h1>
                                <p className="lead text-white">Find Movie is a feature or service that allows users to search for films based on certain criteria. By using "Find Movie", users can find movies by title, actor or actress, director, genre, year of release, or other criteria</p>
                            </div>
                        </div>
                    </section>

                    <form action="" onSubmit={(e) => {
                        e.preventDefault()
                        setData(data)
                    }}>
                        <div className='d-flex justify-content-between'>
                            <input type="text" className="form-control form-control-sm rounded-end-0 bg-transparent" onChange={(e) => setQuery(e.target.value)} style={{
                                border: '2px solid #fca311',
                                color: 'white'
                            }} onBlur={() => {
                                setQuery(query)
                            }} onClick={(e)=>setQuery(e.target.value)}/>
                            <button type="submit" className="btn border-start-0 rounded-start-0" style={{
                                backgroundColor: '#fca311'
                            }}>
                                <i className="fw-bolder fa-solid fa-magnifying-glass" style={{
                                    color: 'white'
                                }} />
                            </button>
                        </div>
                    </form>
                    <div className='py-3'>
                        <h3 className='text-white'>Results :</h3>

                        <div className='my-3'>
                            {areData ? (
                                <div className='row'>
                                    {data.map((item) => {
                                        return (
                                            <div className="col col-sm-12 col-md-6 col-lg-2 d-flex justify-content-center align-items-center px-2 py-2">
                                                <Link to={`/details/${item.id}`} onClick={() => setMovieId(item.id)}>
                                                    <div className="card">
                                                        <i className="fa-solid fa-star d-flex justify-content-center align-items-center p-1 rounded position-absolute" style={{
                                                            color: '#fca311',
                                                            fontSize: '8px',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            top: 5,
                                                            right: 5
                                                        }}>
                                                            <h6 className='ms-1 mb-0' style={{
                                                                fontSize: '8px'
                                                            }}>{item.vote_average}</h6>
                                                        </i>
                                                        {
                                                            item.poster_path ? (
                                                                <LazyMovieImages src={`${imageBaseUrl}${item.poster_path}`} alt={`${item.original_title}`} />
                                                            ) : (
                                                                <div>
                                                                    <h5 className='text-center d-flex align-items-center justify-content-center px-5' style={{
                                                                        height: '38.8vh'
                                                                    }}>Image Not Found</h5>
                                                                </div>
                                                            )
                                                        }
                                                        <div className='px-2 py-2 position-absolute bottom-0 z-1 bg-dark text-white container'>
                                                            <h6 className='fw-bolder mb-0 card-titleCont text-center'>{item.title}</h6>
                                                        </div>
                                                        <div className='card-body position-absolute bg-dark text-white bottom-0 card-content d-flex align-items-center m-auto flex-column z-3'>
                                                            <h6 className=' text-center text-white px-2 fw-bolder'>{item.title}</h6>
                                                            <p className="card-text text-wrap w-100" style={{
                                                                textAlign: 'justify',
                                                                fontSize: '12px'
                                                            }}>{item.overview}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className='w-100 d-flex justify-content-center align-items-center' style={{
                                    height: '40vh'
                                }}>
                                    <h1 className='mb-0 text-white'>(404) Film Not Found</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FindMovie;