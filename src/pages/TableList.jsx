import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import { Link } from "react-router-dom"

const TableList = () => {

    const [data, setData] = useState([])
    const [updated, setUpdated] = useState(false)
    const [page, setPages] = useState(1)
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
    const fetchData = async () => {
        const options = {
            url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2E2MTBhYWY0OTc5ZDExNTE1MjJmYzI1MmVhYTA3NSIsInN1YiI6IjY0ODIzZWYwZTI3MjYwMDE0N2I4YjEwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHzVEQNEq6XN6UEVsmBOAIkB8XAu1SUs7-mxFQTvEMY'
            }
        }

        try {
            const res = await axios.request(options)
            setData(res.data.results)
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
            <Header act2={'text-danger'} />
            <div className="container mt-4 py-5">
                <h1 className="text-center mb-3 text-white">Table List</h1>
                <div className="" style={{
                    maxHeight: '75vh',
                    overflowY: 'auto'
                }}>
                    <table className="table table-dark table-hover table-responsive">
                        <thead className="sticky-top text-center">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Poster</th>
                                <th scope="col">Title</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Popularity</th>
                                <th scope="col">Vote Average</th>
                                <th scope="col">Language</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row" className="text-center">{index + 1}</th>
                                        <td>
                                            <div style={{width: '3rem'}} className="m-auto"><img src={`${imageBaseUrl}${item.poster_path}`} alt="" className="w-100"/></div>
                                        </td>
                                        <td className="text-wrap" style={{width: '20%'}}>{item.title}</td>
                                        <td className="text-center">{item.release_date}</td>
                                        <td className="text-center">{item.popularity}</td>
                                        <td className="text-center">{item.vote_average}</td>
                                        <td className="text-center">{item.original_language}</td>
                                        <td className="text-center">
                                            <Link to={`/details/${item.id}`}>
                                                <p>see details</p>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default TableList