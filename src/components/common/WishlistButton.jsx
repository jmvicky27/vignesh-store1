import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { toggleWishlist, selectIsWishlisted } from '../../features/wishlist/wishlistSlice';
import { showToast } from '../../features/ui/uiSlice';
import styles from './WishlistButton.module.css';

export default function WishlistButton({ product, size = 'md' }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        type: isWishlisted ? 'info' : 'success',
        message: isWishlisted
          ? `Removed "${product.name}" from your wishlist`
          : `Added "${product.name}" to your wishlist`,
      })
    );
  };

  return (
    <button
      className={`${styles.btn} ${styles[size]} ${isWishlisted ? styles.active : ''}`}
      onClick={handleToggle}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      type="button"
    >
      <Heart
        size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18}
        className={styles.icon}
        fill={isWishlisted ? 'currentColor' : 'none'}
      />
    </button>
  );
}
