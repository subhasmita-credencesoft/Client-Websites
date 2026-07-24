
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Seo from '../Components/Seo'
import TopBanner from '../Components/TopBanner'
import Breadcrumbs from '../Components/Breadcrumbs'
import Reveal from '../Components/Reveal'
import BlogCard from '../Components/BlogCard'
import FAQSection from '../Components/FAQSection'
import LocalSEOSection from '../Components/LocalSEOSection'
import { getPostBySlug, getRelatedPosts, getCategoryLabel, getPopularPosts } from '../data/blogContent'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

import { SITE_URL } from '../config/site'

const BlogPost = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#FFFFF0]'>
        <div className='text-center'>
          <h1 className='text-2xl font-display font-bold text-[#1a1923] mb-4'>Article Not Found</h1>
          <p className='text-[#6b677a] mb-6'>The blog post you are looking for does not exist or has been moved.</p>
          <Link to='/blog' className='btn-secondary'>Back to Blog</Link>
        </div>
      </div>
    )
  }

  const related = getRelatedPosts(slug)
  const popular = getPopularPosts().filter(p => p.slug !== slug)

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}${post.canonicalPath}#blogposting`,
    mainEntityOfPage: `${SITE_URL}${post.canonicalPath}`,
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    author: {
      '@type': 'Organization',
      name: 'Hotel Rama Hindustani',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hotel Rama Hindustani',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/hotel-ramahindustani-image/rama-hindustanilogo.avif`,
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${post.canonicalPath}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${post.canonicalPath}` },
    ],
  }

  const faqSchema = post.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${post.canonicalPath}#faq`,
    mainEntity: post.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const renderSection = (section) => {
    switch (section.type) {
      case 'heading':
        if (section.level === 'h2') return <h2 className='text-xl md:text-2xl font-display font-bold text-[#1a1923] mt-10 mb-4'>{section.content}</h2>
        return <h3 className='text-lg md:text-xl font-display font-bold text-[#1a1923] mt-8 mb-3'>{section.content}</h3>
      case 'paragraph':
        return <p className='text-[#6b677a] leading-relaxed mb-4'>{section.content}</p>
      case 'list':
        return (
          <ul className='space-y-2 mb-6'>
            {section.items.map((item, i) => (
              <li key={i} className='flex items-start gap-2.5 text-[#6b677a] leading-relaxed'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#c8a84e] mt-2 shrink-0' />
                {item}
              </li>
            ))}
          </ul>
        )
      case 'cta':
        return (
          <div className='bg-gradient-to-r from-[#c8a84e]/10 to-[#b8922e]/5 rounded-2xl p-6 md:p-8 my-8 border border-[#c8a84e]/20 text-center'>
            <p className='text-[#1a1923] font-medium mb-4'>{section.content}</p>
            <Link to={section.link} className='btn-primary'>
              {section.linkText}
            </Link>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Helmet>
        <script type='application/ld+json'>{JSON.stringify(blogPostingSchema)}</script>
        <script type='application/ld+json'>{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type='application/ld+json'>{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
        keywords={post.keywords}
        ogType='article'
        ogImage={post.featuredImage}
      />

      <TopBanner text={post.title} image={post.featuredImage} />
      <Breadcrumbs />

      <article className='py-12 md:py-16'>
        <div className='section-container'>
          <div className='max-w-3xl mx-auto'>
            <div className='flex flex-wrap items-center gap-3 text-sm text-[#6b677a] mb-6'>
              <span className='text-xs font-medium text-[#c8a84e] bg-[#c8a84e]/10 px-2.5 py-1 rounded-full'>
                {getCategoryLabel(post.category)}
              </span>
              <span className='flex items-center gap-1'>
                <Calendar size={14} />
                {post.date}
              </span>
              <span className='flex items-center gap-1'>
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            {post.sections.map((section, i) => (
              <div key={i}>{renderSection(section)}</div>
            ))}

            <div className='mt-12 pt-8 border-t border-[#d4b896]/20'>
              <Link to='/blog' className='inline-flex items-center gap-2 text-sm text-[#c8a84e] hover:text-[#b8922e] font-medium transition-colors'>
                <ArrowLeft size={14} /> Back to Blog
              </Link>
            </div>

            <div className='mt-10 p-6 bg-[#f5f0eb] rounded-2xl border border-[#d4b896]/20'>
              <h3 className='font-display font-bold text-[#1a1923] mb-3'>Plan Your Jaipur Stay</h3>
              <p className='text-[#6b677a] text-sm leading-relaxed mb-4'>
                Looking for a budget hotel near Jaipur Airport? Hotel Rama Hindustani offers clean AC rooms from ₹1,155/night with free WiFi, free parking, and an on-site vegetarian restaurant.
              </p>
              <div className='flex flex-wrap gap-2'>
                <Link to='/rooms' className='text-xs font-medium text-[#c8a84e] bg-white px-3 py-1.5 rounded-full border border-[#c8a84e]/20 hover:bg-[#c8a84e] hover:text-white transition-all'>View Rooms</Link>
                <Link to='/book-now' className='text-xs font-medium text-[#c8a84e] bg-white px-3 py-1.5 rounded-full border border-[#c8a84e]/20 hover:bg-[#c8a84e] hover:text-white transition-all'>Book Now</Link>
                <Link to='/restaurant' className='text-xs font-medium text-[#c8a84e] bg-white px-3 py-1.5 rounded-full border border-[#c8a84e]/20 hover:bg-[#c8a84e] hover:text-white transition-all'>Restaurant</Link>
                <Link to='/tours' className='text-xs font-medium text-[#c8a84e] bg-white px-3 py-1.5 rounded-full border border-[#c8a84e]/20 hover:bg-[#c8a84e] hover:text-white transition-all'>Sightseeing</Link>
                <Link to='/contact' className='text-xs font-medium text-[#c8a84e] bg-white px-3 py-1.5 rounded-full border border-[#c8a84e]/20 hover:bg-[#c8a84e] hover:text-white transition-all'>Contact Us</Link>
                <Link to='/services' className='text-xs font-medium text-[#c8a84e] bg-white px-3 py-1.5 rounded-full border border-[#c8a84e]/20 hover:bg-[#c8a84e] hover:text-white transition-all'>Amenities</Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className='py-16 md:py-20'>
        <div className='section-container text-center'>
          <Reveal>
            <p className='section-subtitle'>Book Direct</p>
            <h2 className='section-title'>Ready to Stay at Hotel Rama Hindustani?</h2>
            <p className='mt-4 text-[#6b677a] max-w-xl mx-auto leading-relaxed'>
              Book directly through our website for the best rates and exclusive benefits. Our team is ready to welcome you to Jaipur.
            </p>
            <div className='flex flex-wrap justify-center gap-3 mt-8'>
              <Link to='/rooms' className='btn-secondary'>View Rooms</Link>
              <Link to='/book-now' className='btn-primary'>Book Direct</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className='py-16 md:py-20 bg-white/50' aria-label='Related articles'>
          <div className='section-container'>
            <h2 className='text-xl font-display font-bold text-[#1a1923] mb-8'>Related Articles</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {related.map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      {popular.length > 0 && (
        <section className='py-16 md:py-20' aria-label='Popular articles'>
          <div className='section-container'>
            <h2 className='text-xl font-display font-bold text-[#1a1923] mb-8'>Popular Articles</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {popular.slice(0, 4).map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      {post.faqs?.length > 0 && (
        <FAQSection
          title='FAQ'
          subtitle={`Common questions about ${post.title.toLowerCase()}`}
          items={post.faqs}
        />
      )}

      <LocalSEOSection compact />
    </>
  )
}

export default BlogPost
