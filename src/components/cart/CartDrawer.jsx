import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartSavings,
  updateQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';
import { closeCart } from '../../features/ui/uiSlice';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const savings = useSelector(selectCartSavings);

  const deliveryThreshold = 2000;
  const isFreeDelivery = subtotal >= deliveryThreshold || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 149;
  const grandTotal = subtotal + deliveryFee;

  const handleProceedCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };

  return (
    <div className={styles.overlay} onClick={() => dispatch(closeCart())}>
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <ShoppingBag size={20} className={styles.bagIcon} />
            <h2 className={styles.title}>Your Shopping Bag</h2>
            <span className={styles.countBadge}>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className={styles.closeBtn}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {subtotal > 0 && subtotal < deliveryThreshold && (
          <div className={styles.shippingBar}>
            <p>
              Add <strong>₹{(deliveryThreshold - subtotal).toLocaleString('en-IN')}</strong> more for free delivery
            </p>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.min(100, (subtotal / deliveryThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className={styles.itemsList}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} strokeWidth={1.2} className={styles.emptyIcon} />
              <p className={styles.emptyTitle}>Your bag is empty</p>
              <p className={styles.emptySub}>Discover our curated items across apparel, footwear, and home.</p>
              <button
                className={styles.startShoppingBtn}
                onClick={() => {
                  dispatch(closeCart());
                  navigate('/shop');
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.key} className={styles.itemCard}>
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80'}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemName}>
                      <Link
                        to={`/product/${item.id}`}
                        onClick={() => dispatch(closeCart())}
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => dispatch(removeFromCart(item.key))}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className={styles.itemMeta}>
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  </div>

                  <div className={styles.itemFooter}>
                    {/* Quantity Selector */}
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ key: item.key, quantity: item.quantity - 1 }))
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ key: item.key, quantity: item.quantity + 1 }))
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className={styles.itemPricing}>
                      <span className={styles.itemPrice}>
                        ₹{(item.discountedPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.calcRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {savings > 0 && (
              <div className={`${styles.calcRow} ${styles.savings}`}>
                <span>Total Savings</span>
                <span>-₹{savings.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className={styles.calcRow}>
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className={`${styles.calcRow} ${styles.totalRow}`}>
              <span>Estimated Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button className={styles.checkoutBtn} onClick={handleProceedCheckout}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
            <p className={styles.taxNotice}>Taxes and shipping calculated at checkout.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
