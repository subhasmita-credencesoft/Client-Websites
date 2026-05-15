import React from 'react'
import LightGallery from 'lightgallery/react';

import './Css/Gallery.css'

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Reveal from './Reveal';
import { galleryImages } from '../data/siteContent';

const GalleryComp = () => {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
  return (
    <div className='max-w-7xl mx-auto mb-16 px-4 md:px-0 mt-10 section-shell'>
        <Reveal>
            <p className='text-red-500 tracking-[0.35em] uppercase mb-3 text-sm text-center'>Hotel Glimpses</p>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif text-3d'>
                Hotel Gallery
            </h2>
            <hr className='text-red-500 w-[200px] bg-red-500 mx-auto h-1 mb-10 rounded-full'/>
        </Reveal>

        <Reveal className="App" delay={120}>
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                {galleryImages.map((image) => (
                    <a key={image.src} href={image.src}>
                        <img alt={image.alt} src={image.src} loading='lazy' decoding='async' />
                    </a>
                ))}
            </LightGallery>
        </Reveal>
    </div>
  )
}

export default GalleryComp
