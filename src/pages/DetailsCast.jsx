import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const DetailsCast = () => {
    const castId = useParams().castId
    const [data, setData] = useState([])
    const [updated, setUpdated] = useState(false)
    const imageBaseUrl = 'https://image.tmdb.org/t/p/original'
    const fetchData = async () => {
        const options = {
            url: `https://api.themoviedb.org/3/person/${castId}?language=en-US`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            }
        }
        try {
            const res = await axios.request(options)
            const data = res.data
            setData([data])
            setUpdated(!updated)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [updated])
    return (
        <div>
            <Header act1={'text-danger'} />

            <div className='py-5 container vh-100 d-flex justify-content-between align-items-center w-100'>
                <div className='w-50'>
                    {data.map((item) => {
                        return (
                            <div className='w-100 d-flex justify-content-center align-items-center'>
                                <img src={`${imageBaseUrl}${item.profile_path}`} alt="" className='w-50 h-100 rounded-2' />
                            </div>
                        )
                    })}
                </div>
                <div className='w-50'>
                    {data.map((item) => {
                        return (
                            <div className='w-100 d-flex justify-content-start align-items-center'>
                                <div className='text-white'>
                                    <div className='d-flex align-items-center'>
                                        <h1>{item.name}</h1>
                                        <h1 className='ms-3'>({item.known_for_department})</h1>
                                    </div>
                                    {item.birthday || item.deathday || item.place_of_birth ? (
                                        <div className='mb-2'>
                                            <p className='mb-0'>Birthday : {item.birthday}</p>
                                            <p className='mb-0'>Deathhday : {item.deathday}</p>
                                            <p className='mb-0'>Place of Birth : {item.place_of_birth}</p>
                                        </div>
                                    ) : (
                                        <div className='mb-2'>
                                            <p className='mb-0'>Birthday : null</p>
                                            <p className='mb-0'>Deathhday : null</p>
                                            <p className='mb-0'>Place of Birth : null</p>
                                        </div>
                                    )}
                                    <p className='' style={{
                                        textIndent: 30,
                                        textAlign: 'justify',
                                        maxHeight: '35vh',
                                        overflowY: 'auto'
                                    }}>{item.biography}</p>
                                    <button className='btn btn-sm btn-warning fw-bolder' onClick={()=>{
                                        open(`${item.homepage}`)
                                    }}>Visit Homepage</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default DetailsCast;