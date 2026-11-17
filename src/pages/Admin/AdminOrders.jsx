import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, CheckCircle2, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../features/orders/ordersSlice';
import styles from './Admin.module.css';

export default function AdminOrders() {
  const orders = useSelector(selectOrders);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.adminSidebar}>
        <div className={styles.adminLogo}>
          <Shield size={20} className={styles.shieldIcon} />
          <span>VIGNESH ADMIN</span>
        </div>
        <nav className={styles.adminNav}>
          <Link to="/admin" className={styles.navLink}>Overview</Link>
          <Link to="/admin/products" className={styles.navLink}>Products Inventory</Link>
          <Link to="/admin/orders" className={`${styles.navLink} ${styles.activeLink}`}>
            Orders & Courier
          </Link>
          <Link to="/" className={styles.navLink}>Customer Storefront</Link>
        </nav>
      </aside>

      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div>
            <h1 className={styles.pageTitle}>Consignment & Order Operations</h1>
            <p className={styles.pageDesc}>Real-time fulfillment queue and courier tracking dispatch.</p>
          </div>
        </header>

        <div className={styles.filterPills}>
          {['all', 'confirmed', 'shipped', 'delivered'].map((st) => (
            <button
              key={st}
              className={`${styles.filterPill} ${filterStatus === st ? styles.activeFilterPill : ''}`}
              onClick={() => setFilterStatus(st)}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.tableCard}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Date</th>
                <th>Items Count</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ord) => (
                <tr key={ord.id}>
                  <td><strong>{ord.id}</strong></td>
                  <td>{ord.date}</td>
                  <td>{ord.items.length} items</td>
                  <td><strong>₹{ord.total.toLocaleString('en-IN')}</strong></td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[ord.status]}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td>{ord.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
