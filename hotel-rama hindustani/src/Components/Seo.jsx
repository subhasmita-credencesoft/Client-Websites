import React from 'react'
import { Helmet } from 'react-helmet-async'

const defaultDescription =
  'Hotel Rama Hindustani in Jaipur offers comfortable rooms, warm hospitality, easy booking, and direct WhatsApp support for a convenient stay.'

const Seo = ({
  title,
  description = defaultDescription,
  image = '/hotel-ramahindustani-image/rama-hindustanilogo.avif',
  type = 'website',
}) => {
  const pageTitle = title ? `${title} | Hotel Rama Hindustani` : 'Hotel Rama Hindustani'
  const canonical =
    typeof window !== 'undefined' ? window.location.href : 'https://bookone.io/rama-hindustani'

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content='Hotel Rama Hindustani, Jaipur hotel, rooms in Jaipur, hotel booking Jaipur, hotel near Tonk Road, Pratap Nagar hotel' />
      <meta name='robots' content='index, follow' />
      <link rel='canonical' href={canonical} />

      <meta property='og:type' content={type} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonical} />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content='Hotel Rama Hindustani' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Helmet>
  )
}

export default Seo
