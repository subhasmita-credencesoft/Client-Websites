import React from 'react'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import RestaurantSection from '../Components/RestaurantSection'

const Restaurant = () => {
  return (
    <>
      <Seo
        title='Restaurant'
        description='Discover the in-house restaurant at Hotel Rama Hindustani with hygienic cooking, Indian cuisine, and affordable meals in Jaipur.'
      />
      <TopBanner text='Restaurant' />
      <RestaurantSection />
    </>
  )
}

export default Restaurant
