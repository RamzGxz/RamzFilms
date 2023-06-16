import React, {useState} from 'react';
import LoaderMovie from './LoaderMovie';

const LazyMovieImages = ({src, alt}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div>
            {!imageLoaded && <LoaderMovie/>}
            <img src={src} alt={alt} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} className='card-img-top'/>
        </div>
    );
};

export default LazyMovieImages;