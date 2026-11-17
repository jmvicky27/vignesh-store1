import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Star,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../../data/products';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { addRecentlyViewed } from '../../features/products/productsSlice';
import { showToast, openCart } from '../../features/ui/uiSlice';
import StarRating from '../../components/common/StarRating';
import ProductCard from '../../components/common/ProductCard';
import RecommendationSection from '../../components/recommendations/RecommendationSection';
import styles from './ProductDetailsPage.module.css';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = getProductById(id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product));
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
      setActiveImageIndex(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product, dispatch]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>The product you are seeking might have been moved or archived.</p>
        <Link to="/shop" className={styles.backBtn}>Return to Collections</Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1594938298603-c8148c4b4d89?w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  ];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        selectedSize: selectedSize || 'Standard',
        selectedColor: selectedColor || 'Original',
      })
    );
    dispatch(
      showToast({
        type: 'success',
        message: `Added ${quantity}x "${product.name}" to your bag`,
      })
    );
    dispatch(openCart());
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        type: 'info',
        message: `Wishlist updated for "${product.name}"`,
      })
    );
  };

  const related = getRelatedProducts(product, 4);

  return (
    <div className={styles.pageContainer}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <ChevronRight size={14} />
        <span className={styles.currentCrumb}>{product.name}</span>
      </nav>

      {/* Main Grid: Gallery (left) + Details (right) */}
      <div className={styles.mainGrid}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrap}>
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className={styles.mainImage}
            />
            {product.discountPercent > 0 && (
              <span className={styles.heroDiscountBadge}>
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`${styles.thumbBtn} ${activeImageIndex === idx ? styles.activeThumb : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Pane */}
        <div className={styles.details}>
          <div className={styles.brandBadge}>{product.brand}</div>
          <h1 className={styles.productName}>{product.name}</h1>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <StarRating rating={product.rating} count={product.reviewCount} />
            <span className={styles.inStockTag}>
              <Check size={14} />
              In Stock ({product.stockCount} available)
            </span>
          </div>

          {/* Pricing */}
          <div className={styles.priceRow}>
            <span className={styles.discountedPrice}>
              ₹{product.discountedPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className={styles.savedAmount}>
                You save ₹{(product.originalPrice - product.discountedPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.divider} />

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Tone / Color:</span>
                <span className={styles.optionSelectedVal}>{selectedColor}</span>
              </div>
              <div className={styles.colorPills}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`${styles.colorBtn} ${selectedColor === c ? styles.activeColor : ''}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Size:</span>
                <span className={styles.optionSelectedVal}>{selectedSize}</span>
              </div>
              <div className={styles.sizeGrid}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`${styles.sizeBtn} ${selectedSize === s ? styles.activeSize : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Row */}
          <div className={styles.actionRow}>
            <div className={styles.quantityControl}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              <ShoppingBag size={18} />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              className={styles.wishlistBtn}
              onClick={handleWishlist}
              aria-label="Save to wishlist"
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Value Props Badges */}
          <div className={styles.valueProps}>
            <div className={styles.propItem}>
              <Truck size={18} />
              <div>
                <strong>Express Delivery</strong>
                <span>Complimentary on orders above ₹2,000</span>
              </div>
            </div>
            <div className={styles.propItem}>
              <RotateCcw size={18} />
              <div>
                <strong>14-Day Atelier Returns</strong>
                <span>Hassle-free collection at your doorstep</span>
              </div>
            </div>
            <div className={styles.propItem}>
              <ShieldCheck size={18} />
              <div>
                <strong>Authenticity Verified</strong>
                <span>Crafted directly by audited master artisans</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Craft Details */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section className={styles.specsSection}>
          <h2 className={styles.specsTitle}>Material & Specifications</h2>
          <div className={styles.specsTable}>
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className={styles.specsRow}>
                <span className={styles.specKey}>{key}</span>
                <span className={styles.specVal}>{val}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Smart Recommendations Section */}
      <RecommendationSection currentProductId={product.id} currentCategory={product.category} />

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Appreciate</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
