'use client';

import { useId, useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
import { Icon } from '@/components/ui/Icon';
import type { BlogCardData } from '@/lib/blog';
import styles from './BlogExplorer.module.scss';

interface CategoryOption {
  slug: string;
  name: string;
}

interface BlogExplorerProps {
  posts: BlogCardData[];
  categories: CategoryOption[];
}

/**
 * BlogExplorer
 * Lightweight client-side search and category filter for the blog index.
 * All cards are server-rendered first, so the full article list remains in the
 * HTML for crawlers and no-JS users; filtering only narrows what is displayed.
 */
export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const searchId = useId();

  const normalized = query.trim().toLowerCase();
  const isFiltering = normalized !== '' || category !== 'all';

  const results = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory = category === 'all' || post.category === category;
        const haystack = `${post.title} ${post.excerpt} ${post.categoryName}`.toLowerCase();
        const matchesQuery = normalized === '' || haystack.includes(normalized);
        return matchesCategory && matchesQuery;
      }),
    [posts, category, normalized],
  );

  const featured = posts[0];
  const rest = posts.slice(1);

  function clearFilters() {
    setQuery('');
    setCategory('all');
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.controls}>
        <div className={styles.search}>
          <label htmlFor={searchId} className={styles.srOnly}>
            Search articles
          </label>
          <Icon name="search" size={16} className={styles.searchIcon} />
          <input
            id={searchId}
            type="search"
            className={styles.searchInput}
            placeholder="Search articles…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className={styles.categories} role="group" aria-label="Filter articles by category">
          <button
            type="button"
            className={`${styles.chip} ${category === 'all' ? styles.chipActive : ''}`}
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {categories.map((option) => (
            <button
              key={option.slug}
              type="button"
              className={`${styles.chip} ${category === option.slug ? styles.chipActive : ''}`}
              aria-pressed={category === option.slug}
              onClick={() => setCategory(option.slug)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {isFiltering ? (
        <>
          <p className={styles.status} role="status">
            {results.length} article{results.length === 1 ? '' : 's'} found
          </p>
          {results.length > 0 ? (
            <div className={styles.grid}>
              {results.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No articles match your search.</p>
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {featured && (
            <div className={styles.featured}>
              <BlogCard post={featured} featured />
            </div>
          )}
          <div className={styles.grid}>
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
