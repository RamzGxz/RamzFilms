import React from 'react'
import '../styles/loader.css'
const LoaderOnces = ({width}) => {
    return (
        <div className='container py-3 m-auto d-flex justify-content-center align-items-center' style={{
            height: '50vh',
            width: width
        }}>
            <div className="loader m-auto">
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
                <div className="bar4" />
                <div className="bar5" />
                <div className="bar6" />
                <div className="bar7" />
                <div className="bar8" />
                <div className="bar9" />
                <div className="bar10" />
                <div className="bar11" />
                <div className="bar12" />
            </div>
        </div>
    )
}

export default LoaderOnces