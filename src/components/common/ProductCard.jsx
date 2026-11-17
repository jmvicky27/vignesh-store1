import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { addToCart } from '../../features/cart/cartSlice';
import { showToast, openCart } from '../../features/ui/uiSlice';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, layout = 'grid' }) {
  const dispatch = useDispatch();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes?.[0] || 'Standard',
        selectedColor: product.colors?.[0] || 'Original',
      })
    );
    dispatch(
      showToast({
        type: 'success',
        message: `Added "${product.name}" to your bag`,
      })
    );
    dispatch(openCart());
  };

  const imageSrc = product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80';

  return (
    <div className={`${styles.card} ${styles[layout]}`}>
      {/* Image Container */}
      <div className={styles.mediaContainer}>
        <Link to={`/product/${product.id}`} className={styles.imageLink}>
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            className={styles.image}
          />
        </Link>

        {/* Wishlist Button floating top-right */}
        <div className={styles.wishlistWrap}>
          <WishlistButton product={product} size="sm" />
        </div>

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <span className={styles.discountBadge}>
            -{product.discountPercent}%
          </span>
        )}

        {/* Quick Add Button sliding from bottom */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className={styles.quickAddBtn}
        >
          <ShoppingBag size={15} />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{product.category}</span>
          <span className={styles.brand}>{product.brand}</span>
        </div>

        <h3 className={styles.title}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className={styles.ratingRow}>
          <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.discountedPrice?.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.discountedPrice && (
            <span className={styles.originalPrice}>
              ₹{product.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
