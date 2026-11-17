import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { selectWishlistItems, removeFromWishlist, clearWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { showToast, openCart } from '../../features/ui/uiSlice';
import StarRating from '../../components/common/StarRating';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleMoveToCart = (product) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes?.[0] || 'Standard',
        selectedColor: product.colors?.[0] || 'Original',
      })
    );
    dispatch(removeFromWishlist(product.id));
    dispatch(
      showToast({
        type: 'success',
        message: `Moved "${product.name}" to your shopping bag`,
      })
    );
    dispatch(openCart());
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      dispatch(
        addToCart({
          product,
          quantity: 1,
          selectedSize: product.sizes?.[0] || 'Standard',
          selectedColor: product.colors?.[0] || 'Original',
        })
      );
    });
    dispatch(clearWishlist());
    dispatch(
      showToast({
        type: 'success',
        message: `Transferred all items to your shopping bag`,
      })
    );
    dispatch(openCart());
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Heart size={56} strokeWidth={1.2} className={styles.emptyIcon} />
        <h1 className={styles.emptyTitle}>Your Wishlist is Empty</h1>
        <p className={styles.emptySub}>
          Save pieces you admire to revisit later or transfer directly into your shopping bag.
        </p>
        <Link to="/shop" className={styles.emptyBtn}>
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wishlistContainer}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>SAVED SELECTION</span>
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.countText}>
            You have saved <strong>{wishlistItems.length}</strong> items.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button onClick={handleAddAllToCart} className={styles.addAllBtn}>
            <ShoppingBag size={16} />
            <span>Add All to Bag</span>
          </button>
          <button
            onClick={() => dispatch(clearWishlist())}
            className={styles.clearBtn}
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {wishlistItems.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'}
                  alt={product.name}
                  className={styles.image}
                />
              </Link>
              <button
                onClick={() => dispatch(removeFromWishlist(product.id))}
                className={styles.removeIconBtn}
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className={styles.content}>
              <span className={styles.category}>{product.category}</span>
              <h3 className={styles.productName}>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>

              <div className={styles.ratingRow}>
                <StarRating rating={product.rating} count={product.reviewCount} size="sm" />
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>
                  ₹{product.discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.discountedPrice && (
                  <span className={styles.originalPrice}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleMoveToCart(product)}
                className={styles.moveToBagBtn}
              >
                <ShoppingBag size={15} />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
