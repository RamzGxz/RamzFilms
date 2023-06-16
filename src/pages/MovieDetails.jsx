import React from 'react';
import Header from '../components/Header';

const MovieDetails = ({id}) => {
    return (
        <div>
            <Header/>
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <h1>id: {id}</h1>
            </div>
        </div>
    );
};

export default MovieDetails;