import React from 'react';
import './banner.css';

function Banner() {
    return (
        <header className='banner'>
            <div className='text-section'>
                <h1 className='top-text'>Welcome to AI Camp!</h1>
                <h1 className='bottom-text'>What are you waiting for? Start your AI journey now!</h1>
            </div>
        </header>
    );
}

export default Banner;