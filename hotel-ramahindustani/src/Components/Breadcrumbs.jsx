import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { getPostBySlug } from '../data/blogContent'

const labelMap = {
  '/': 'Home',
  '/rooms': 'Rooms',
  '/tours': 'Tours',
  '/gallery': 'Gallery',
  '/about': 'About',
  '/contact': 'Contact',
  '/restaurant': 'Restaurant',
  '/services': 'Services',
  '/book-now': 'Book Now',
  '/blog': 'Blog',
}

const Breadcrumbs = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  return (
    <nav aria-label='Breadcrumb' className='bg-[#f5f0eb]/60 border-b border-[#d4b896]/10'>
      <div className='section-container py-2.5'>
        <ol className='flex items-center gap-1.5 text-xs text-[#6b677a] flex-wrap'>
          <li>
            <Link to='/' className='flex items-center gap-1 hover:text-[#c8a84e] transition-colors' aria-label='Home'>
              <Home size={12} />
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`
            let label = labelMap[path]
            if (!label) {
              const post = getPostBySlug(segment)
              label = post ? post.title : segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
            }
            const isLast = index === pathSegments.length - 1

            return (
              <li key={path} className='flex items-center gap-1.5'>
                <ChevronRight size={10} className='text-[#d4b896]' />
                {isLast ? (
                  <span className='text-[#1a1923] font-medium' aria-current='page'>{label}</span>
                ) : (
                  <Link to={path} className='hover:text-[#c8a84e] transition-colors'>{label}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumbs
