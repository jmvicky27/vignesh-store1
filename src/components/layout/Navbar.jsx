import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Tag,
} from 'lucide-react';
import { selectCartCount } from '../../features/cart/cartSlice';
import { selectWishlistItems } from '../../features/wishlist/wishlistSlice';
import { selectIsAuthenticated, selectUser } from '../../features/auth/authSlice';
import {
  toggleCart,
  toggleMobileMenu,
  selectMobileMenuOpen,
  closeMobileMenu,
} from '../../features/ui/uiSlice';
import { categories, products } from '../../data/products';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop', hasDropdown: true },
  { label: 'Collections', href: '/categories' },
  { label: 'New In', href: '/shop?sort=newest' },
  { label: 'Sale', href: '/shop?sale=true' },
];

const POPULAR_SEARCHES = [
  'White Sneaker',
  'Linen Blazer',
  'Field Watch',
  'Leather Boot',
  'Duvet Set',
  'Silk Dress',
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistItems = useSelector(selectWishlistItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const mobileMenuOpen = useSelector(selectMobileMenuOpen);

  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Close search when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (
        searchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Compute smart product recommendations
  const recommendations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    // Synonyms and semantic tokens
    const synonyms = {
      shoe: ['footwear', 'sneaker', 'boot', 'loafer', 'sandal'],
      shoes: ['footwear', 'sneaker', 'boot', 'loafer', 'sandal'],
      sneaker: ['footwear', 'sneaker', 'shoe'],
      footwear: ['shoe', 'sneaker', 'boot', 'loafer'],
      shirt: ['clothing', 'shirt', 'blazer', 'trousers', 'cotton'],
      pant: ['trousers', 'denim', 'clothing'],
      pants: ['trousers', 'denim', 'clothing'],
      blazer: ['linen', 'clothing', 'blazer', 'coat'],
      watch: ['watch', 'automatic', 'accessories', 'time'],
      bag: ['tote', 'wallet', 'carry', 'accessories'],
      whit: ['white'],
    };

    const searchTokens = [q];
    Object.keys(synonyms).forEach((key) => {
      if (q.includes(key) || key.includes(q)) {
        searchTokens.push(...synonyms[key]);
      }
    });

    return products
      .filter((p) => {
        const name = p.name.toLowerCase();
        const brand = p.brand.toLowerCase();
        const category = p.category.toLowerCase();
        const desc = p.description.toLowerCase();
        const colors = (p.colors || []).join(' ').toLowerCase();

        return searchTokens.some(
          (t) =>
            name.includes(t) ||
            brand.includes(t) ||
            category.includes(t) ||
            desc.includes(t) ||
            colors.includes(t)
        );
      })
      .slice(0, 5);
  }, [searchQuery]);

  // Matching categories
  const matchingCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return categories.filter(
      (cat) => cat.name.toLowerCase().includes(q) || cat.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setSearchOpen(false);
  };

  const handleSelectPopular = (term) => {
    setSearchQuery(term);
    searchRef.current?.focus();
  };

  return (
    <>
      {/* Announcement bar */}
      <div className={styles.announcement}>
        <span>
          Free shipping on orders above ₹2,000 &nbsp;·&nbsp; Use code{' '}
          <strong>VIGNESH10</strong> for 10% off
        </span>
      </div>

      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Mobile: hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => dispatch(toggleMobileMenu())}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={() => dispatch(closeMobileMenu())}>
            <span className={styles.logoText}>VIGNESH</span>
            <span className={styles.logoSub}>STORE</span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className={styles.navItem}
                onMouseEnter={() => link.hasDropdown && setShopDropdown(true)}
                onMouseLeave={() => setShopDropdown(false)}
              >
                <Link to={link.href} className={styles.navLink}>
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} className={styles.chevron} />}
                </Link>
                {link.hasDropdown && shopDropdown && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownGrid}>
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.id}`}
                          className={styles.dropdownItem}
                          onClick={() => setShopDropdown(false)}
                        >
                          <div className={styles.dropdownImg}>
                            <img src={cat.image} alt={cat.name} />
                          </div>
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ''}`}
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search catalog"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className={styles.iconBtn}
              aria-label={`Wishlist (${wishlistItems.length})`}
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className={styles.badge}>{wishlistItems.length}</span>
              )}
            </Link>

            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={styles.iconBtn}
              aria-label="Account"
            >
              {isAuthenticated && user?.avatar ? (
                <img src={user.avatar} alt={user.name} className={styles.avatar} />
              ) : (
                <User size={20} />
              )}
            </Link>

            <button
              className={styles.iconBtn}
              onClick={() => dispatch(toggleCart())}
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* ══ SMART SEARCH EXPANDABLE BAR & RECOMMENDATIONS DROPDOWN ══ */}
        {searchOpen && (
          <div className={styles.searchContainer} ref={searchContainerRef}>
            <div className={styles.searchBar}>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Type to search (e.g. 'whit', 'linen', 'shoe', 'watch')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={styles.searchClear}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
              <button onClick={() => setSearchOpen(false)} className={styles.searchClose}>
                Close
              </button>
            </div>

            {/* Recommendations Dropdown Panel */}
            <div className={styles.recommendationsDropdown}>
              {searchQuery.trim().length > 0 ? (
                <>
                  {/* Category Pills if any match */}
                  {matchingCategories.length > 0 && (
                    <div className={styles.recSection}>
                      <span className={styles.recSectionTitle}>Matching Categories</span>
                      <div className={styles.categoryPills}>
                        {matchingCategories.map((c) => (
                          <Link
                            key={c.id}
                            to={`/shop?category=${c.id}`}
                            className={styles.catPill}
                            onClick={() => setSearchOpen(false)}
                          >
                            <Tag size={12} />
                            <span>{c.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Products */}
                  {recommendations.length > 0 ? (
                    <div className={styles.recSection}>
                      <div className={styles.recHeaderRow}>
                        <span className={styles.recSectionTitle}>Recommended Creations</span>
                        <span className={styles.recCount}>{recommendations.length} items</span>
                      </div>
                      <div className={styles.recList}>
                        {recommendations.map((p) => (
                          <div
                            key={p.id}
                            className={styles.recItem}
                            onClick={() => handleSelectProduct(p.id)}
                            role="button"
                            tabIndex={0}
                          >
                            <img
                              src={
                                p.images?.[0] ||
                                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80'
                              }
                              alt={p.name}
                              className={styles.recThumb}
                            />
                            <div className={styles.recInfo}>
                              <div className={styles.recTitleRow}>
                                <h4 className={styles.recName}>{p.name}</h4>
                                <span className={styles.recPrice}>
                                  ₹{p.discountedPrice.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <div className={styles.recMetaRow}>
                                <span className={styles.recBrand}>{p.brand}</span>
                                <span className={styles.recDot}>·</span>
                                <span className={styles.recCategory}>{p.category}</span>
                                {p.discountPercent > 0 && (
                                  <span className={styles.recDiscount}>
                                    -{p.discountPercent}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <ArrowRight size={16} className={styles.recArrow} />
                          </div>
                        ))}
                      </div>

                      {/* View All Matching Button */}
                      <button onClick={handleSearch} className={styles.viewAllBtn}>
                        <span>View all matching results for "{searchQuery}"</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.noRecFound}>
                      <p>No exact product recommendations found for "{searchQuery}".</p>
                      <button onClick={handleSearch} className={styles.trySearchBtn}>
                        Search entire catalog for "{searchQuery}" →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Empty query state: Popular suggestions */
                <div className={styles.popularWrap}>
                  <div className={styles.popularHeader}>
                    <TrendingUp size={15} className={styles.popularIcon} />
                    <span>Popular Searches & Curation</span>
                  </div>
                  <div className={styles.popularPills}>
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        className={styles.popularPill}
                        onClick={() => handleSelectPopular(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            <div className={styles.mobileSearch}>
              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  dispatch(closeMobileMenu());
                }}
              >
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search products (e.g. 'whit')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Mobile Recommendations when typing in mobile menu */}
            {searchQuery.trim().length > 0 && recommendations.length > 0 && (
              <div className={styles.mobileRecWrap}>
                <span className={styles.mobileRecTitle}>Recommendations:</span>
                {recommendations.map((p) => (
                  <div
                    key={p.id}
                    className={styles.mobileRecItem}
                    onClick={() => {
                      handleSelectProduct(p.id);
                      dispatch(closeMobileMenu());
                    }}
                  >
                    <img src={p.images?.[0]} alt={p.name} />
                    <div>
                      <strong>{p.name}</strong>
                      <span>₹{p.discountedPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={styles.mobileNavLink}
                onClick={() => dispatch(closeMobileMenu())}
              >
                {link.label}
              </Link>
            ))}
            <div className={styles.mobileDivider} />
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className={styles.mobileCatLink}
                onClick={() => dispatch(closeMobileMenu())}
              >
                {cat.name}
              </Link>
            ))}
            <div className={styles.mobileDivider} />
            {isAuthenticated ? (
              <Link
                to="/account"
                className={styles.mobileNavLink}
                onClick={() => dispatch(closeMobileMenu())}
              >
                My Account
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={styles.mobileNavLink}
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={styles.mobileNavLink}
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
