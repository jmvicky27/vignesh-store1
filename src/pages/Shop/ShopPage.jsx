import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, SlidersHorizontal, RotateCcw, Search, Grid, List } from 'lucide-react';
import { categories } from '../../data/products';
import {
  selectFilteredProducts,
  selectFilters,
  setFilter,
  resetFilters,
  applyFilters,
} from '../../features/products/productsSlice';
import ProductCard from '../../components/common/ProductCard';
import Pagination from '../../components/common/Pagination';
import styles from './ShopPage.module.css';

export default function ShopPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredProducts = useSelector(selectFilteredProducts);
  const filters = useSelector(selectFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const itemsPerPage = 9;

  // Sync url category or sort param on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    const sort = searchParams.get('sort');
    if (cat || sort) {
      dispatch(setFilter({ category: cat || '', sort: sort || 'featured' }));
    }
    dispatch(applyFilters());
  }, [searchParams, dispatch]);

  const handleCategoryChange = (catId) => {
    const newCat = filters.category === catId ? '' : catId;
    dispatch(setFilter({ category: newCat }));
    dispatch(applyFilters());
    setCurrentPage(1);
  };

  const handlePriceChange = (min, max) => {
    dispatch(setFilter({ minPrice: min, maxPrice: max }));
    dispatch(applyFilters());
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    dispatch(setFilter({ sort: e.target.value }));
    dispatch(applyFilters());
  };

  const handleRatingChange = (rating) => {
    dispatch(setFilter({ minRating: filters.minRating === rating ? 0 : rating }));
    dispatch(applyFilters());
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(applyFilters());
    setSearchParams({});
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.shopContainer}>
      {/* Hero Header */}
      <div className={styles.shopHeader}>
        <span className={styles.eyebrow}>CURATED CATALOG</span>
        <h1 className={styles.title}>All Collections</h1>
        <p className={styles.subtitle}>
          Discover pieces rooted in high-end editorial aesthetics, natural fibres, and meticulous construction.
        </p>
      </div>

      <div className={styles.shopContent}>
        {/* Left Sidebar Filter */}
        <aside className={`${styles.sidebar} ${mobileFilterOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarTitle}>
              <SlidersHorizontal size={18} />
              <span>Filter Catalog</span>
            </div>
            <button onClick={handleReset} className={styles.resetBtn}>
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories */}
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>Category</h4>
            <div className={styles.categoryList}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`${styles.catBtn} ${filters.category === cat.id ? styles.activeCat : ''}`}
                >
                  <span>{cat.name}</span>
                  <span className={styles.countBadge}>{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>Price (₹)</h4>
            <div className={styles.priceTiers}>
              {[
                { label: 'All Prices', min: 0, max: 100000 },
                { label: 'Under ₹3,000', min: 0, max: 3000 },
                { label: '₹3,000 - ₹7,000', min: 3000, max: 7000 },
                { label: '₹7,000 - ₹15,000', min: 7000, max: 15000 },
                { label: 'Above ₹15,000', min: 15000, max: 100000 },
              ].map((tier, idx) => (
                <label key={idx} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.minPrice === tier.min && filters.maxPrice === tier.max}
                    onChange={() => handlePriceChange(tier.min, tier.max)}
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>Minimum Rating</h4>
            <div className={styles.ratingTiers}>
              {[4.5, 4.0, 3.5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`${styles.ratingPill} ${filters.minRating === star ? styles.activeRating : ''}`}
                >
                  ★ {star} & Up
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Product Grid Area */}
        <div className={styles.mainGridArea}>
          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <span className={styles.resultsCount}>
              Showing <strong>{filteredProducts.length}</strong> creations
            </span>

            <div className={styles.sortWrap}>
              <label htmlFor="shop-sort">Sort by:</label>
              <select
                id="shop-sort"
                value={filters.sort || 'featured'}
                onChange={handleSortChange}
                className={styles.sortSelect}
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>

              <button
                className={styles.mobileFilterToggle}
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {displayedProducts.length === 0 ? (
            <div className={styles.noResults}>
              <Search size={40} className={styles.noResultsIcon} />
              <h3 className={styles.noResultsTitle}>No matching pieces found</h3>
              <p className={styles.noResultsSub}>
                Try adjusting or resetting your filters to view our full collection.
              </p>
              <button onClick={handleReset} className={styles.noResultsResetBtn}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {displayedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.paginationWrap}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
