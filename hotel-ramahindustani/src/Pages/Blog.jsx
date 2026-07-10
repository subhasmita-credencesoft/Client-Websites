import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../Components/Seo'
import StructuredData from '../Components/StructuredData'
import TopBanner from '../Components/TopBanner'
import BlogCard from '../Components/BlogCard'
import Reveal from '../Components/Reveal'
import FAQSection from '../Components/FAQSection'
import { blogPosts, blogCategories, getFeaturedPost, getPopularPosts } from '../data/blogContent'
import { hotelImages } from '../data/siteContent'
import { Search } from 'lucide-react'

const blogFaqs = [
  {
    question: 'What is the best budget hotel near Jaipur Airport?',
    answer: 'Hotel Rama Hindustani in Pratap Nagar is the best budget hotel near Jaipur Airport, located just 5 km from the terminal with rooms starting at ₹1,155 per night.',
  },
  {
    question: 'What hotel is near JECC Jaipur?',
    answer: 'Hotel Rama Hindustani is approximately 4 km from JECC (Jaipur Exhibition and Convention Centre), making it the ideal choice for event attendees.',
  },
  {
    question: 'Is Hotel Rama Hindustani good for family stays?',
    answer: 'Yes, Hotel Rama Hindustani is a family-friendly hotel in Pratap Nagar with spacious rooms for up to 4 guests, homely food at Rama Rasoi, and a safe environment.',
  },
  {
    question: 'How do I book a room at Hotel Rama Hindustani?',
    answer: 'You can book directly through our website, via WhatsApp at +91 63767 07091, or by calling us. Direct booking guarantees the best available rates.',
  },
]

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featured = getFeaturedPost()
  const popular = getPopularPosts()

  const filtered = useMemo(() => {
    let posts = blogPosts
    if (activeCategory !== 'all') {
      posts = posts.filter(p => p.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.sections.some(s => s.type === 'paragraph' && s.content.toLowerCase().includes(q))
      )
    }
    return posts
  }, [activeCategory, searchQuery])

  const nonFeatured = filtered.filter(p => p.slug !== featured?.slug)

  return (
    <>
      <Seo
        title='Blog — Hotel Rama Hindustani | Jaipur Travel Guide & Hotel Tips'
        description='Read the Hotel Rama Hindustani blog for Jaipur travel guides, hotel tips, local attraction guides, and booking advice. Best budget hotel in Pratap Nagar Jaipur near Airport, JECC, and attractions.'
        canonicalPath='/blog'
        keywords='Hotel Rama Hindustani blog, Jaipur travel blog, Pratap Nagar Jaipur guide, hotel near Jaipur Airport blog, budget hotel Jaipur tips, things to do in Jaipur'
      />
      <StructuredData page='blog' />

      <TopBanner text='Blog' image={hotelImages.frontJpg} />

      <section className='py-12 md:py-16'>
        <div className='section-container'>
          <Reveal className='text-center max-w-3xl mx-auto'>
            <p className='section-subtitle'>Hotel Rama Hindustani Blog</p>
            <h1 className='section-title'>Jaipur Travel Guide & Hotel Tips</h1>
            <p className='mt-4 text-[#6b677a] leading-relaxed'>
              Discover the best of Jaipur through our blog. From budget hotel tips near Jaipur Airport and JECC to local attraction guides and travel advice — everything you need to plan your perfect stay at Hotel Rama Hindustani in Pratap Nagar.
            </p>
          </Reveal>

          <div className='flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-10'>
            <nav className='flex flex-wrap gap-2' role='tablist' aria-label='Blog categories'>
              {blogCategories.map(cat => (
                <button
                  key={cat.id}
                  role='tab'
                  aria-selected={activeCategory === cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSearchQuery('') }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-[#c8a84e] text-white shadow-md'
                      : 'bg-white text-[#6b677a] border border-[#d4b896]/20 hover:border-[#c8a84e]/40 hover:text-[#1a1923]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
            <div className='relative w-full lg:w-72'>
              <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-[#6b677a]' />
              <input
                type='text'
                placeholder='Search articles...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full pl-9 pr-4 py-2.5 bg-white border border-[#d4b896]/20 rounded-xl text-sm text-[#1a1923] placeholder-[#6b677a]/60 focus:outline-none focus:border-[#c8a84e]/50 focus:ring-1 focus:ring-[#c8a84e]/20 transition-all'
                aria-label='Search blog articles'
              />
            </div>
          </div>
        </div>
      </section>

      {activeCategory === 'all' && !searchQuery && featured && (
        <section className='py-12 md:py-16' aria-label='Featured article'>
          <div className='section-container'>
            <h2 className='text-lg font-display font-bold text-[#1a1923] mb-6'>Featured Article</h2>
            <BlogCard post={featured} featured />
          </div>
        </section>
      )}

      {activeCategory === 'all' && !searchQuery && popular.length > 0 && (
        <section className='pb-12 md:pb-16' aria-label='Popular articles'>
          <div className='section-container'>
            <h2 className='text-lg font-display font-bold text-[#1a1923] mb-6'>Popular Articles</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {popular.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className='pb-16 md:pb-24' aria-label='All articles'>
        <div className='section-container'>
          <h2 className='text-lg font-display font-bold text-[#1a1923] mb-6'>
            {activeCategory === 'all' && !searchQuery ? 'Latest Articles' : searchQuery ? `Search Results (${filtered.length})` : `${blogCategories.find(c => c.id === activeCategory)?.label || ''} Articles`}
          </h2>
          {nonFeatured.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {nonFeatured.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className='text-center py-16'>
              <p className='text-[#6b677a]'>No articles found matching your search.</p>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className='mt-3 text-[#c8a84e] font-medium text-sm hover:underline'>
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className='py-16 md:py-20 bg-[#1a1923]'>
        <div className='section-container text-center'>
          <Reveal>
            <h2 className='text-white font-display text-2xl md:text-3xl font-bold mb-4'>Experience Jaipur at Hotel Rama Hindustani</h2>
            <p className='text-white/50 max-w-xl mx-auto leading-relaxed mb-8'>
              Ready to book your stay? Browse our <Link to='/rooms' className='text-[#c8a84e] hover:underline font-medium'>rooms</Link>, explore our{' '}
              <Link to='/gallery' className='text-[#c8a84e] hover:underline font-medium'>gallery</Link>, or{' '}
              <Link to='/contact' className='text-[#c8a84e] hover:underline font-medium'>contact us</Link> for personalized assistance.
            </p>
            <div className='flex flex-wrap justify-center gap-3'>
              <Link to='/rooms' className='btn-secondary'>Explore Rooms</Link>
              <Link to='/book-now' className='btn-primary'>Book Direct</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection
        title='Blog FAQs'
        subtitle='Common questions about our hotel and Jaipur travel.'
        items={blogFaqs}
      />
    </>
  )
}

export default Blog
