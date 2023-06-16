import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper'
import 'swiper/swiper.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import axios from 'axios'
import { Link } from 'react-router-dom'


SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

const SwiperCard = ({ setMovieId }) => {
    const [data, setData] = useState([])
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

    const swiperParams = {
        spaceBetween: 40,
        slidesPerView: 9,
        navigation: true,
        pagination: true,
        loop: true,
        autoplay: {
            delay: 2000
        },
        mousewheel: true
    }

    const fetchData = async () => {
        const options = {
            url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=10',
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
        fetchData()
    }, [data])
    return (
        <div>
            <Swiper {...swiperParams}>
                {data.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <Link to={`/details/${item.id}`} onClick={()=>setMovieId(item.id)}>
                                <div className='card' style={{ width: '9rem' }} >
                                    <i className="fa-solid fa-star position-absolute d-flex justify-content-center align-items-center p-1 rounded" style={{
                                        color: '#fca311',
                                        top: 5,
                                        right: 5,
                                        fontSize: '10px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                    }}><h6 className='ms-1 mb-0' style={{
                                        fontSize: '10px'
                                    }}>{item.vote_average}</h6></i>
                                    <img src={`${imageBaseUrl}${item.poster_path}`} alt={`${item.original_title}`} style={{
                                        width: '100%',
                                        height: '30vh'
                                    }} />
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    );
};

export default SwiperCard;