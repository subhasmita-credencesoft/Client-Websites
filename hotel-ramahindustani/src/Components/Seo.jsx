/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.hotelramahindustani.com'
const DEFAULT_OG_IMAGE = '/hotel-ramahindustani-image/hotel-rama-hindustani-jaipur-Front -pic-4.avif'

const Seo = ({
  title,
  description,
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  nofollow = false,
  publishedTime,
  modifiedTime,
  keywords,
}) => {
  const fullTitle = title.includes('Hotel Rama Hindustani') ? title : `${title} | Hotel Rama Hindustani`
  const canonical = `${SITE_URL}${canonicalPath}`
  const robots = noindex || nofollow
    ? `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      {keywords && <meta name='keywords' content={keywords} />}
      <link rel='canonical' href={canonical} />
      <meta name='robots' content={robots} />
      <meta name='googlebot' content={robots} />

      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonical} />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content='Hotel Rama Hindustani' />
      <meta property='og:locale' content='en_IN' />
      <meta property='og:image' content={`${SITE_URL}${ogImage}`} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={description} />
      {publishedTime && <meta property='article:published_time' content={publishedTime} />}
      {modifiedTime && <meta property='article:modified_time' content={modifiedTime} />}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={`${SITE_URL}${ogImage}`} />
      <meta name='twitter:image:alt' content={description} />

      <meta name='geo.region' content='IN-RJ' />
      <meta name='geo.placename' content='Jaipur' />
      <meta name='geo.position' content='26.8;75.8' />
      <meta name='ICBM' content='26.8, 75.8' />

      <meta name='theme-color' content='#1a1923' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      <meta name='apple-mobile-web-app-title' content='Hotel Rama Hindustani' />
      <meta name='application-name' content='Hotel Rama Hindustani' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='format-detection' content='telephone=yes' />
    </Helmet>
  )
}

export default Seo
