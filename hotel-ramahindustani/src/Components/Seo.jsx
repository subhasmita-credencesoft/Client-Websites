import { Helmet } from 'react-helmet-async'

const Seo = ({ title, description }) => (
  <Helmet>
    <title>{title} | Hotel Rama Hindustani</title>
    <meta name="description" content={description} />
  </Helmet>
)

export default Seo
