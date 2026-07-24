/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { getCategoryLabel } from '../data/blogContent'

const BlogCard = ({ post, featured = false }) => {
  return (
    <article className={`group bg-white rounded-2xl overflow-hidden border border-[#d4b896]/15 shadow-sm hover:border-[#c8a84e]/30 hover:shadow-lg transition-all duration-300 ${featured ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''}`}>
      <Link to={`/blog/${post.slug}`} className='block overflow-hidden relative'>
        <img
          src={post.featuredImage}
          alt={post.imageAlt}
          width={800}
          height={500}
          loading='lazy'
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${featured ? 'h-64 lg:h-full' : 'h-52'}`}
        />
      </Link>
      <div className='p-5 md:p-6 flex flex-col justify-between'>
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <span className='text-xs font-medium text-[#c8a84e] bg-[#c8a84e]/10 px-2.5 py-1 rounded-full'>
              {getCategoryLabel(post.category)}
            </span>
          </div>
          <Link to={`/blog/${post.slug}`}>
            <h3 className={`font-display font-bold text-[#1a1923] group-hover:text-[#c8a84e] transition-colors leading-snug mb-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
              {post.title}
            </h3>
          </Link>
          <p className='text-[#6b677a] text-sm leading-relaxed mb-4 line-clamp-3'>
            {post.excerpt}
          </p>
        </div>
        <div>
          <div className='flex items-center gap-3 text-xs text-[#6b677a] mb-3'>
            <span className='flex items-center gap-1'>
              <Calendar size={12} />
              {post.date}
            </span>
            <span className='flex items-center gap-1'>
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className='inline-flex items-center gap-1 text-sm font-medium text-[#c8a84e] hover:text-[#b8922e] transition-colors'
          >
            Read More <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
