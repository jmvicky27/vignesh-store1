import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  LogOut,
  MapPin,
  Shield,
  CreditCard,
  Edit2,
  Check,
} from 'lucide-react';
import { selectUser, logout, updateProfile } from '../../features/auth/authSlice';
import { selectOrders } from '../../features/orders/ordersSlice';
import { selectWishlistItems } from '../../features/wishlist/wishlistSlice';
import { showToast } from '../../features/ui/uiSlice';
import styles from './AccountPage.module.css';

export default function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  const wishlist = useSelector(selectWishlistItems);

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Priya Sharma',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '+91 98765 43210',
    address: user?.address || '42 Cathedral Road, Alwarpet, Chennai',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setIsEditing(false);
    dispatch(
      showToast({
        type: 'success',
        message: 'Atelier profile data updated successfully',
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', message: 'Signed out from your account' }));
    navigate('/');
  };

  return (
    <div className={styles.accountContainer}>
      {/* Header Banner */}
      <div className={styles.userBanner}>
        <div className={styles.avatarWrap}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'}
            alt={user?.name || 'User'}
            className={styles.avatar}
          />
        </div>
        <div className={styles.bannerInfo}>
          <span className={styles.clientRole}>
            {user?.role === 'admin' ? 'Curator Administrator' : 'Privileged Patron'}
          </span>
          <h1 className={styles.clientName}>{user?.name || 'Priya Sharma'}</h1>
          <span className={styles.clientEmail}>{user?.email || 'user@example.com'}</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className={styles.layout}>
        {/* Navigation Sidebar */}
        <nav className={styles.sidebar}>
          <button
            className={`${styles.navItem} ${activeTab === 'profile' ? styles.activeNav : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile Dossier</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'orders' ? styles.activeNav : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={18} />
            <span>Order Archive ({orders.length})</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'wishlist' ? styles.activeNav : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={18} />
            <span>Saved Pieces ({wishlist.length})</span>
          </button>
          {user?.role === 'admin' && (
            <Link to="/admin" className={styles.adminNavLink}>
              <Shield size={18} />
              <span>Enter Admin Console</span>
            </Link>
          )}
        </nav>

        {/* Tab Content */}
        <div className={styles.contentPane}>
          {activeTab === 'profile' && (
            <div className={styles.profileCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Client Profile & Delivery Coordinates</h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={styles.editToggleBtn}
                >
                  {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
                  <span>{isEditing ? 'Cancel Edit' : 'Modify Details'}</span>
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label>Full Legal Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Communication Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Default Dispatch Address</label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <button type="submit" className={styles.saveBtn}>
                    Save Coordinates
                  </button>
                </form>
              ) : (
                <div className={styles.detailsView}>
                  <div className={styles.detailItem}>
                    <span>Full Legal Name</span>
                    <strong>{user?.name || formData.name}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Email Coordinate</span>
                    <strong>{user?.email || formData.email}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Mobile Telephone</span>
                    <strong>{user?.phone || formData.phone}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Default Atelier Address</span>
                    <strong>{user?.address || formData.address}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className={styles.ordersTab}>
              <h2 className={styles.cardTitle}>Recent Acquisitions</h2>
              <div className={styles.ordersList}>
                {orders.map((o) => (
                  <div key={o.id} className={styles.orderMiniCard}>
                    <div>
                      <strong>{o.id}</strong>
                      <span> · {o.date}</span>
                    </div>
                    <div>
                      <span>Total: ₹{o.total.toLocaleString('en-IN')}</span>
                      <Link to="/order-tracking" className={styles.miniTrackLink}>
                        Track
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className={styles.wishlistTab}>
              <h2 className={styles.cardTitle}>Saved Artifacts ({wishlist.length})</h2>
              {wishlist.length === 0 ? (
                <p className={styles.emptyNote}>No artifacts currently saved in your dossier.</p>
              ) : (
                <div className={styles.wishlistList}>
                  {wishlist.map((item) => (
                    <div key={item.id} className={styles.wishlistMiniItem}>
                      <img src={item.images?.[0]} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <span>₹{item.discountedPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <Link to={`/product/${item.id}`} className={styles.viewPieceLink}>
                        View Piece
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
