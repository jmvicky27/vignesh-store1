import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Truck, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { selectOrders } from '../../features/orders/ordersSlice';
import styles from './OrdersPage.module.css';

export default function OrdersPage() {
  const orders = useSelector(selectOrders);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'all') return true;
    return o.status === activeTab;
  });

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>CLIENT REPOSITORIES</span>
        <h1 className={styles.title}>My Order History</h1>
        <p className={styles.subtitle}>
          Review previous acquisitions, courier stages, and invoice records.
        </p>

        {/* Status Filters */}
        <div className={styles.tabs}>
          {['all', 'confirmed', 'shipped', 'delivered'].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <Package size={48} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No orders in this category</p>
          <Link to="/shop" className={styles.shopBtn}>Explore Creations</Link>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.orderDate}>Ordered on {order.date}</span>
                </div>
                <div className={styles.cardStatus}>
                  <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                  <span className={styles.orderTotal}>
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className={styles.itemsRow}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.itemThumb}>
                    <span>{item.name} (x{item.qty})</span>
                    <strong className={styles.itemCost}>₹{item.price.toLocaleString('en-IN')}</strong>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <span className={styles.destText}>Destination: {order.address}</span>
                <Link to="/order-tracking" className={styles.trackLink}>
                  <Truck size={14} />
                  <span>Track Live Consignment</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
