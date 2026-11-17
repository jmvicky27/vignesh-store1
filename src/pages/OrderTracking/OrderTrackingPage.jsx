import { useState } from 'react';
import { Search, CheckCircle2, Clock, Truck, Package, ShieldCheck } from 'lucide-react';
import styles from './OrderTrackingPage.module.css';

export default function OrderTrackingPage() {
  const [orderQuery, setOrderQuery] = useState('ORD-2024-001');
  const [hasSearched, setHasSearched] = useState(true);

  const trackingSteps = [
    { title: 'Order Placed & Verified', date: 'Nov 10, 10:30 AM', status: 'completed' },
    { title: 'Artisanal Preparation', date: 'Nov 10, 04:15 PM', status: 'completed' },
    { title: 'Dispatched via Express Courier', date: 'Nov 11, 09:00 AM', status: 'completed' },
    { title: 'Arrived at Hub (Chennai)', date: 'Nov 12, 02:40 PM', status: 'completed' },
    { title: 'Out for Handover Delivery', date: 'Nov 13, 08:30 AM', status: 'current' },
    { title: 'Delivered', date: 'Estimated Today by 6 PM', status: 'upcoming' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className={styles.trackContainer}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>REAL-TIME TELEMETRY</span>
        <h1 className={styles.title}>Track Consignment</h1>
        <p className={styles.subtitle}>
          Enter your order reference code to verify logistics milestones and carrier trajectory.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="e.g. ORD-2024-001"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>
            Locate Package
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div>
              <span className={styles.orderLabel}>Active Tracking Reference</span>
              <h2 className={styles.orderNumber}>{orderQuery.toUpperCase()}</h2>
            </div>
            <div className={styles.statusPill}>
              <Clock size={14} />
              <span>In Transit - Out for Handover</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className={styles.timeline}>
            {trackingSteps.map((step, idx) => (
              <div key={idx} className={`${styles.timelineStep} ${styles[step.status]}`}>
                <div className={styles.stepIndicator}>
                  <div className={styles.circle}>
                    {step.status === 'completed' ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  {idx < trackingSteps.length - 1 && <div className={styles.trailLine} />}
                </div>

                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <span className={styles.stepDate}>{step.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.carrierInfo}>
            <div className={styles.carrierItem}>
              <Truck size={16} />
              <span>Carrier: Vignesh Elite Logistics (Air Cargo)</span>
            </div>
            <div className={styles.carrierItem}>
              <ShieldCheck size={16} />
              <span>Full Transit Insurance Guaranteed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
