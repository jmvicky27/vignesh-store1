import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Plus, Trash2, Edit2, Shield } from 'lucide-react';
import { products } from '../../data/products';
import styles from './Admin.module.css';

export default function AdminProducts() {
  const [productList, setProductList] = useState(products);
  const [query, setQuery] = useState('');

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (id) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.adminSidebar}>
        <div className={styles.adminLogo}>
          <Shield size={20} className={styles.shieldIcon} />
          <span>VIGNESH ADMIN</span>
        </div>
        <nav className={styles.adminNav}>
          <Link to="/admin" className={styles.navLink}>Overview</Link>
          <Link to="/admin/products" className={`${styles.navLink} ${styles.activeLink}`}>
            Products Inventory
          </Link>
          <Link to="/admin/orders" className={styles.navLink}>Orders & Courier</Link>
          <Link to="/" className={styles.navLink}>Customer Storefront</Link>
        </nav>
      </aside>

      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div>
            <h1 className={styles.pageTitle}>Product Inventory Control</h1>
            <p className={styles.pageDesc}>Catalogue master database, stock counts, and price levels.</p>
          </div>
        </header>

        <div className={styles.searchBarRow}>
          <div className={styles.searchWrap}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className={styles.countText}>{filtered.length} SKUs Total</span>
        </div>

        <div className={styles.tableCard}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Artifact</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className={styles.productCell}>
                    <img src={item.images?.[0]} alt={item.name} className={styles.tableThumb} />
                    <div>
                      <strong>{item.name}</strong>
                      <span className={styles.tableBrand}>{item.brand} · {item.id}</span>
                    </div>
                  </td>
                  <td className={styles.capitalize}>{item.category}</td>
                  <td>₹{item.discountedPrice.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={item.stockCount < 15 ? styles.stockLow : styles.stockNormal}>
                      {item.stockCount} units
                    </span>
                  </td>
                  <td>★ {item.rating.toFixed(1)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={styles.deleteActionBtn}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
