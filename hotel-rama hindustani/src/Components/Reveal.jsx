import React, { useEffect, useRef } from 'react'

const Reveal = ({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  variant = '',
}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={elementRef}
      className={`scroll-reveal ${variant} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
