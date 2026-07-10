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
    : 'bg-[#f5f0eb]/60 border-b border-[#d4b896]/10'
  const textClass = light ? 'text-white/70' : 'text-[#6b677a]'
  const activeClass = light ? 'text-white font-medium' : 'text-[#1a1923] font-medium'
  const linkHoverClass = light ? 'hover:text-white' : 'hover:text-[#c8a84e]'
  const separatorClass = light ? 'text-white/30' : 'text-[#d4b896]'

  return (
    <nav aria-label='Breadcrumb' className={navClass}>
      <div className='section-container py-2.5'>
        <ol className={`flex items-center gap-1.5 text-xs ${textClass} flex-wrap`}>
          <li>
            <Link to='/' className={`flex items-center gap-1 transition-colors ${linkHoverClass}`} aria-label='Home'>
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
                <ChevronRight size={10} className={separatorClass} />
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
