import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import GalleryComp from '../Components/GalleryComp'
import { hotelImages } from '../data/siteContent'

const Gallery = () => {
  return (
    <>
      <Seo
        title='Gallery'
        description='View the hotel gallery of Hotel Rama Hindustani in Jaipur, including rooms, reception, restaurant, and property highlights.'
      />
      <TopBanner text='Gallery' image={hotelImages.frontAlt} />
      <GalleryComp />
    </>
  )
}

export default Gallery
