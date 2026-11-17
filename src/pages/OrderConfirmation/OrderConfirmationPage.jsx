import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircle2, PackageCheck, ArrowRight, Truck } from 'lucide-react';
import { selectCurrentOrder } from '../../features/orders/ordersSlice';
import styles from './OrderConfirmationPage.module.css';

export default function OrderConfirmationPage() {
  const currentOrder = useSelector(selectCurrentOrder);

  const orderId = currentOrder?.id || 'ORD-2024-9842';
  const orderTotal = currentOrder?.total || 6299;

  return (
    <div className={styles.confirmContainer}>
      <div className={styles.card}>
        <div className={styles.iconRing}>
          <CheckCircle2 size={48} className={styles.checkIcon} />
        </div>

        <span className={styles.pretitle}>TRANSACTION SUCCESSFUL</span>
        <h1 className={styles.title}>Your Order is Placed</h1>
        <p className={styles.subtitle}>
          Thank you for choosing VIGNESH STORE. We have reserved your items and our artisans are preparing your consignment.
        </p>

        <div className={styles.detailsBox}>
          <div className={styles.detailRow}>
            <span>Order Reference</span>
            <strong>{orderId}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Estimated Handover</span>
            <strong>3-5 Business Days</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Total Authorized</span>
            <strong>₹{orderTotal.toLocaleString('en-IN')}</strong>
          </div>
          <div className={styles.detailRow}>
            <span>Delivery Courier</span>
            <strong>Vignesh White-Glove Logistics</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/order-tracking" className={styles.trackBtn}>
            <Truck size={16} />
            <span>Track Consignment</span>
          </Link>
          <Link to="/shop" className={styles.shopBtn}>
            <span>Return to Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
