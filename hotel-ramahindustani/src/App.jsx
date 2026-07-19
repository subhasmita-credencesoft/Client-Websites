import { Suspense, lazy } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ScrollToTopBtn from 'react-scroll-to-top'
import ScrollToTopOnNavigate from './Components/ScrollToTop'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer'

import Rooms from './Pages/Rooms'
import Tours from './Pages/Tours'

const Home = lazy(() => import('./Pages/Home'))
const Gallery = lazy(() => import('./Pages/Gallery'))
const About = lazy(() => import('./Pages/About'))
const Contact = lazy(() => import('./Pages/Contact'))
const Restaurant = lazy(() => import('./Pages/Restaurant'))
const Services = lazy(() => import('./Pages/Services'))
const BookNow = lazy(() => import('./Pages/BookNow'))
const Blog = lazy(() => import('./Pages/Blog'))
const BlogPost = lazy(() => import('./Pages/BlogPost'))
const RoomDetail = lazy(() => import('./Pages/RoomDetail'))
const NotFound = lazy(() => import('./Pages/NotFound'))

const PageLoader = () => (
  <div className='min-h-screen bg-[#FFFFF0] pt-32 pb-16 px-4 flex items-start justify-center'>
    <div className='text-[#6b677a]'>Loading...</div>
  </div>
)

const SiteLayout = () => (
  <>
    <ScrollToTopOnNavigate />
    <Navbar />
    <main id='main-content'>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'rooms', element: <Rooms /> },
      { path: 'rooms/:slug', element: <RoomDetail /> },
      { path: 'tours', element: <Tours /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'restaurant', element: <Restaurant /> },
      { path: 'services', element: <Services /> },
      { path: 'book-now', element: <BookNow /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

const App = () => {
  return (
    <div className='site-shell'>
      <RouterProvider router={router} />
      <ScrollToTopBtn
        color='white'
        smooth
        style={{
          background: 'linear-gradient(135deg, #c8a84e, #b8922e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(200, 168, 78, 0.3)',
        }}
      />
    </div>
  )
}

export default App
