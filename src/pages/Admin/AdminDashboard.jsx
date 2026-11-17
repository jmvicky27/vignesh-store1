import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Shield,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { products } from '../../data/products';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../features/orders/ordersSlice';
import styles from './Admin.module.css';

const SALES_DATA = [
  { month: 'Jan', revenue: 420000, orders: 120 },
  { month: 'Feb', revenue: 580000, orders: 165 },
  { month: 'Mar', revenue: 640000, orders: 190 },
  { month: 'Apr', revenue: 780000, orders: 230 },
  { month: 'May', revenue: 910000, orders: 275 },
  { month: 'Jun', revenue: 840000, orders: 250 },
  { month: 'Jul', revenue: 1050000, orders: 310 },
  { month: 'Aug', revenue: 1180000, orders: 340 },
  { month: 'Sep', revenue: 1320000, orders: 385 },
  { month: 'Oct', revenue: 1540000, orders: 440 },
  { month: 'Nov', revenue: 1847230, orders: 512 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);

  const lowStock = products.filter((p) => p.stockCount < 15);
  const topSelling = products.slice(0, 5);

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.adminSidebar}>
        <div className={styles.adminLogo}>
          <Shield size={20} className={styles.shieldIcon} />
          <span>VIGNESH ADMIN</span>
        </div>
        <nav className={styles.adminNav}>
          <Link to="/admin" className={`${styles.navLink} ${styles.activeLink}`}>
            <TrendingUp size={18} />
            <span>Overview</span>
          </Link>
          <Link to="/admin/products" className={styles.navLink}>
            <Package size={18} />
            <span>Products Inventory</span>
          </Link>
          <Link to="/admin/orders" className={styles.navLink}>
            <ShoppingBag size={18} />
            <span>Orders & Courier</span>
          </Link>
          <Link to="/" className={styles.navLink}>
            <ArrowUpRight size={18} />
            <span>Customer Storefront</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div>
            <h1 className={styles.pageTitle}>Executive Commerce Dashboard</h1>
            <p className={styles.pageDesc}>Real-time performance telemetry and inventory status.</p>
          </div>
          <div className={styles.adminBadge}>Authorized Session: Administrator</div>
        </header>

        {/* 4 Stat Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <DollarSign size={20} />
            </div>
            <div>
              <span className={styles.statLabel}>Gross Revenue (YTD)</span>
              <h3 className={styles.statValue}>₹18,47,230</h3>
              <span className={styles.statTrend}>+14.8% vs previous cycle</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <span className={styles.statLabel}>Total Orders</span>
              <h3 className={styles.statValue}>512</h3>
              <span className={styles.statTrend}>+8.2% conversion rate</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <Users size={20} />
            </div>
            <div>
              <span className={styles.statLabel}>Registered Patrons</span>
              <h3 className={styles.statValue}>1,204</h3>
              <span className={styles.statTrend}>+42 new this month</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <Layers size={20} />
            </div>
            <div>
              <span className={styles.statLabel}>Active SKUs</span>
              <h3 className={styles.statValue}>{products.length}</h3>
              <span className={styles.statTrend}>Across 6 categories</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Revenue Trajectory (Monthly)</h3>
            <span className={styles.chartSub}>In INR (₹)</span>
          </div>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1C3A5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1C3A5E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8e4dc" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#1A1A1A', color: '#fff', borderRadius: '8px' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1C3A5E"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dual Panels: Top Sellers & Low Stock */}
        <div className={styles.dualGrid}>
          {/* Top Products */}
          <div className={styles.panelCard}>
            <h3 className={styles.panelTitle}>Top Performing Artifacts</h3>
            <div className={styles.panelList}>
              {topSelling.map((p, idx) => (
                <div key={p.id} className={styles.panelItem}>
                  <span className={styles.rankNum}>#{idx + 1}</span>
                  <img src={p.images?.[0]} alt={p.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{p.name}</span>
                    <span className={styles.itemCategory}>{p.category}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    ₹{p.discountedPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className={styles.panelCard}>
            <div className={styles.lowStockHeader}>
              <AlertTriangle size={18} className={styles.alertIcon} />
              <h3 className={styles.panelTitle}>Inventory Alert (Stock &lt; 15)</h3>
            </div>
            <div className={styles.panelList}>
              {lowStock.map((p) => (
                <div key={p.id} className={styles.panelItem}>
                  <img src={p.images?.[0]} alt={p.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{p.name}</span>
                    <span className={styles.itemCategory}>SKU: {p.id}</span>
                  </div>
                  <span className={styles.stockBadge}>{p.stockCount} units left</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
