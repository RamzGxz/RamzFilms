import React from 'react';
import Header from '../components/Header';

const About = () => {
    return (
        <div>
            <Header act5={'text-danger'} />
            <section className="text-center py-5 mt-5 container">
                <div className="row pb-3">
                    <div className="">
                        <h1 className="fw-bolder text-white">About</h1>
                        <p className="lead text-white">RamzFilms is a website for knowing a movie details. Why use RamzFilms? because is a web to know our movie</p>
                    </div>
                </div>
            </section>
            

        </div >
    );
};

export default About;