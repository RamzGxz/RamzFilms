import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const movieId = useParams().movieId
    const [dataFilm, setDataFilm] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'
    const fetchData = async () => {
        const options = {
            url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            }
        }
        try {
            const res = await axios.request(options)
            setDataFilm([res.data])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return (
        <div>

            {dataFilm.map(item => {
                const genres = item.genres
                const companies = item.production_companies
                return (
                    <div>
                        <div className='vh-100' style={{
                            width: '100%',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url("${imageBaseUrl}${item.backdrop_path}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <div>
                                <Header act1={'text-danger'} />
                            </div>
                            <div className='d-flex justify-content-center align-items-center w-100 vh-100 flex-column container'>
                                <h1 className='text-white fw-bolder'>{item.title}</h1>
                                <p className='text-center text-white my-3 '>{item.overview}</p>
                                <div className='d-flex justify-content-between align-content-center'>
                                    {genres.map(item => {
                                        return (
                                            <div className='bg-danger text-white btn-sm mx-2 fw-bolder py-2 px-3 rounded-3 my-2'>{item.name}</div>
                                        )
                                    })}
                                </div>
                                <div className='d-flex justify-content-between align-content-center'>
                                    {companies.map((item) => {
                                        return (
                                            <div className='d-flex flex-column align-items-center mx-1 mt-3 rounded-circle justify-content-center px-2'>
                                                {item.logo_path ? (
                                                    <div className='rounded-circle bg-white' style={{
                                                        width: '55px',
                                                        height: '55px',
                                                        backgroundImage: `url("${imageBaseUrl}${item.logo_path}")`,
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'contain',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}></div>
                                                ) : (
                                                    <div className='rounded-circle bg-white' style={{
                                                        width: '55px',
                                                        height: '55px',
                                                        backgroundImage: `url("https://media.istockphoto.com/id/1415203156/vector/error-page-page-not-found-vector-icon-in-line-style-design-isolated-on-white-background.jpg?s=170667a&w=0&k=20&c=3atpUeIQAPc92yZVrL4DzfXmIEDAxOiM0-H_SFKJwAY=")`,
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                    }}></div>
                                                )}
                                                <div><p className='text-center fw-bolder text-white mb-0 mt-1'>{item.name}</p></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='py-3 d-flex justify-content-between align-items-center' style={{
                            height: '65vh'
                        }}>
                            <div className='w-50 d-flex justify-content-center align-items-center container'>

                                <img src={`${imageBaseUrl}${item.poster_path}`} alt="" style={{
                                    width: '18rem',
                                    height: '100%'
                                }} className='m-auto rounded-1' />
                            </div>
                            <div className='w-75 d-flex container align-items-start flex-column'>
                                <div className='d-flex justify-content-between'>
                                    <h3 className='text-white'>{item.title}</h3>
                                    <h3 className='text-white mx-2'>({item.release_date.slice(0, 4)})</h3>
                                </div>
                                <div className='d-flex justify-content-between mt-2'>
                                    {genres.map((item) => {
                                        return (
                                            <p className='me-2 mb-0 text-white'>{item.name}</p>
                                        )
                                    })}
                                    <p className='text-white'>{item.runtime}Mins</p>
                                    <p className='mb-0 ms-2 text-white'>{item.release_date}</p>
                                    <div className='ms-2' style={{ color: '#fca311' }}>
                                        <i className='fa-solid fa-star me-1'></i>
                                        {item.vote_average}
                                    </div>
                                </div>
                                <div>
                                    <p className='mb-0 text-white'>{item.overview}</p>
                                    <a href={`${item.homepage}`} className='btn btn-sm btn-warning mt-3 fw-bold'>Visit Site</a>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    );
};

export default MovieDetails;