import React, {useState} from 'react';
import LoaderOnces from './LoaderOnces';

const LazyMovieImages = ({src, alt}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div>
            {!imageLoaded && <LoaderOnces width={'8rem'}/>}
            <img src={src} alt={alt} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} className='card-img-top'/>
        </div>
    );
};

export default LazyMovieImages;