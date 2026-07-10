import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { getPostBySlug } from '../data/blogContent'

/* eslint-disable react/prop-types */

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

const Breadcrumbs = ({ light }) => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  const navClass = light
    ? 'bg-transparent border-0'
    : 'bg-[#f5f0eb]/60 border-b border-[#d4b896]/15'
  const textClass = light ? 'text-white/70' : 'text-[#6b677a]'
  const activeClass = light
    ? 'text-[#c8a84e] font-semibold tracking-wide'
    : 'text-[#1a1923] font-semibold tracking-wide'
  const linkHoverClass = light ? 'hover:text-white' : 'hover:text-[#c8a84e]'
  const separatorClass = light ? 'text-white/30' : 'text-[#c8a84e]'

  return (
    <nav aria-label='Breadcrumb' className={navClass}>
      <div className='section-container py-3'>
        <ol className={`flex items-center gap-2 text-sm tracking-wide ${textClass} flex-wrap`}>
          <li>
            <Link to='/' className={`flex items-center gap-1.5 transition-colors ${linkHoverClass}`} aria-label='Home'>
              <Home size={15} className='text-[#c8a84e]' />
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
              <li key={path} className='flex items-center gap-2'>
                <ChevronRight size={13} className={separatorClass} />
                {isLast ? (
                  <span className={activeClass} aria-current='page'>{label}</span>
                ) : (
                  <Link to={path} className={`transition-colors ${linkHoverClass}`}>{label}</Link>
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
