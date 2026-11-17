import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartSavings,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  clearCart,
} from '../../features/cart/cartSlice';
import { showToast } from '../../features/ui/uiSlice';
import { useState } from 'react';
import styles from './CartPage.module.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const savings = useSelector(selectCartSavings);

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  const deliveryThreshold = 2000;
  const isFreeDelivery = subtotal >= deliveryThreshold || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 149;
  const grandTotal = Math.max(0, subtotal - discountApplied + deliveryFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VIGNESH10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountApplied(discount);
      dispatch(applyCoupon({ code: 'VIGNESH10', amount: discount }));
      dispatch(showToast({ type: 'success', message: 'VIGNESH10 coupon applied! 10% discount added.' }));
    } else {
      dispatch(showToast({ type: 'error', message: 'Invalid coupon code. Try "VIGNESH10"' }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <ShoppingBag size={56} strokeWidth={1.2} className={styles.emptyIcon} />
        <h1 className={styles.emptyTitle}>Your Shopping Bag is Empty</h1>
        <p className={styles.emptySub}>
          Explore our seasonal curation of bespoke clothing, footwear, and artisanal items.
        </p>
        <Link to="/shop" className={styles.emptyBtn}>
          Explore All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Shopping Bag</h1>
      <p className={styles.pageSubtitle}>
        Review your chosen artifacts before proceeding to secure courier dispatch.
      </p>

      <div className={styles.layout}>
        {/* Left: Items Table */}
        <div className={styles.itemsCol}>
          <div className={styles.itemsHeader}>
            <span>Item Description</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          <div className={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.key} className={styles.itemRow}>
                <div className={styles.productCell}>
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                    alt={item.name}
                    className={styles.productImg}
                  />
                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>{item.category}</span>
                    <h3 className={styles.productTitle}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <div className={styles.variantBadges}>
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Tone: {item.selectedColor}</span>}
                    </div>
                    <span className={styles.unitPrice}>
                      ₹{item.discountedPrice.toLocaleString('en-IN')} each
                    </span>
                  </div>
                </div>

                {/* Qty Cell */}
                <div className={styles.qtyCell}>
                  <div className={styles.quantityPicker}>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ key: item.key, quantity: item.quantity - 1 }))
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(updateQuantity({ key: item.key, quantity: item.quantity + 1 }))
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.key))}
                    className={styles.removeBtn}
                  >
                    <Trash2 size={15} />
                    <span>Remove</span>
                  </button>
                </div>

                {/* Price Cell */}
                <div className={styles.priceCell}>
                  <span className={styles.rowTotal}>
                    ₹{(item.discountedPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.itemsActions}>
            <Link to="/shop" className={styles.continueLink}>
              ← Continue Exploring
            </Link>
            <button onClick={() => dispatch(clearCart())} className={styles.clearCartBtn}>
              Clear Bag
            </button>
          </div>
        </div>

        {/* Right: Summary Card */}
        <aside className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Summary</h2>

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
              <div className={styles.couponInputWrap}>
                <Tag size={16} className={styles.couponIcon} />
                <input
                  type="text"
                  placeholder="VIGNESH10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={styles.couponInput}
                />
              </div>
              <button type="submit" className={styles.applyBtn}>
                Apply
              </button>
            </form>

            <div className={styles.calcList}>
              <div className={styles.calcLine}>
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {savings > 0 && (
                <div className={`${styles.calcLine} ${styles.greenText}`}>
                  <span>Promotional Discount</span>
                  <span>-₹{savings.toLocaleString('en-IN')}</span>
                </div>
              )}
              {discountApplied > 0 && (
                <div className={`${styles.calcLine} ${styles.greenText}`}>
                  <span>VIGNESH10 Coupon</span>
                  <span>-₹{discountApplied.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className={styles.calcLine}>
                <span>Shipping & Handling</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>

              <div className={styles.totalDivider} />

              <div className={`${styles.calcLine} ${styles.grandTotalLine}`}>
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className={styles.checkoutBtn}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className={styles.trustBadges}>
              <ShieldCheck size={18} />
              <span>Complimentary insured shipping & guaranteed return integrity.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
