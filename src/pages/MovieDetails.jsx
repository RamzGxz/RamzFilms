import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
    const movieId = useParams().movieId
    const [dataFilm, setDataFilm] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'
    const imageCastBaseUrl = 'https://image.tmdb.org/t/p/w500'

    const [cast, setCast] = useState([])
    const navigate = useNavigate()

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

    const fetchCastMovie = async () => {
        const options = {
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            }
        }

        try {
            const res = await axios.request(options)
            const data = res.data
            setCast(data.cast)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
        fetchCastMovie()
    }, [])
    return (
        <div>

            {dataFilm.map(item => {
                const genres = item.genres
                const companies = item.production_companies
                const spoken = item.spoken_languages

                const timeConvert = () => {
                    let time = item.runtime
                    let hour = Math.floor(time / 60)
                    let minute = time % 60
                    let result = `${hour}h ${minute}m`
                    return result
                }

                return (
                    <div>
                        <div className='vh-100' style={{
                            width: '100%',
                            backgroundImage: `linear-gradient(rgba(0,0,0, 0.7), rgba(0, 0, 0, 0.5)), url("${imageBaseUrl}${item.backdrop_path}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <div>
                                <Header act1={'text-danger'} />
                            </div>
                            <div className='d-flex justify-content-center align-items-center w-100 vh-100 flex-column container'>
                                <h1 className='text-white fw-bolder'>{item.title}</h1>
                                <p className='text-center text-white my-3'>{item.overview}</p>
                                <div className='d-flex justify-content-between align-content-center'>
                                    {genres.map(item => {
                                        return (
                                            <div className='text-white btn-sm mx-2 fw-bolder py-1 px-2 rounded-3 my-2' style={{
                                                backgroundColor: 'rgb(20, 33, 61)'
                                            }}>{item.name}</div>
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
                            <div className='w-75 d-flex justify-content-center align-items-center container flex-lg-row flex-sm-column'>

                                <img src={`${imageBaseUrl}${item.poster_path}`} style={{
                                    width: '18rem',
                                    height: '100%'
                                }} className='m-auto rounded-1' />
                            </div>
                            <div className='w-75 d-flex container align-items-start flex-column '>
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
                                    <p className='text-white'>{timeConvert()}</p>
                                    <p className='mb-0 ms-2 text-white'>({item.release_date})</p>
                                    <div className='ms-2' style={{ color: '#fca311' }}>
                                        <i className='fa-solid fa-star me-1'></i>
                                        {item.vote_average}
                                    </div>

                                </div>

                                <div>
                                    <p className='text-white fst-italic'>Tagline: "{item.tagline}"</p>
                                    <p className='mb-0 text-white'>{item.overview}</p>
                                    <div className='d-flex py-1'>
                                        <p className='mb-0 text-white pe-1'>[</p>
                                        {spoken.map((item) => {
                                            return (
                                                <p className='text-white'>{item.iso_639_1},</p>
                                            )
                                        })}
                                        <p className='mb-0 text-white ps-1'>]</p>
                                    </div>
                                    {item.homepage ? (
                                        <button className='btn btn-sm btn-warning mt-0 fw-bold' onClick={() => {
                                            open(`${item.homepage}`)
                                        }}>Visit Site</button>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                            <section className="text-center pt-5 mt-4">
                                <div className="row pb-3">
                                    <div className="col-lg-6 col-md-8 mx-auto">
                                        <h1 className="fw-bolder text-white">Cast</h1>
                                        <p className="lead text-white">A film cast is a group of actors chosen to portray characters in a film. They bring characters to life, express emotions, and interact with each other. A good cast has strong acting skills and chemistry, contributing to the film's success and quality.</p>
                                    </div>
                                </div>
                            </section>

                            <div className='row py-2 gap-2 m-auto d-flex justify-content-center flex-row flex-sm-fill'>
                                {cast.map((item) => {
                                    return (
                                        <div className="col col-lg-2 px-0 card" style={{ width: '8rem' }}>
                                            <Link to={`/cast-details/${item.id}`}>
                                                {item.profile_path ? (
                                                    <img src={`${imageCastBaseUrl}${item.profile_path}`} alt="" className='w-100 h-100' />
                                                ) : (
                                                    <img src={`https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png`} alt="" className='w-100 bg-white h-100' />
                                                )}
                                                <div className='card-body position-absolute bottom-0 m-auto w-100 bg-dark p-0 pt-0'>
                                                    <p className='mb-0 text-center text-white px-1 py-1' style={{ fontSize: 12 }}>{item.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className=' position-fixed' style={{
                bottom: 10,
                right: 10
            }}>
                <button className='btn btn-dark' onClick={() => { navigate('/') }}>Back to Home</button>
            </div>
        </div>
    );
};

export default MovieDetails;