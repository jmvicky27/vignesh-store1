import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Globe, Share2, Compass } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const handleNewsletter = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoTitle}>VIGNESH</span>
              <span className={styles.logoSub}>STORE</span>
            </Link>
            <p className={styles.brandDesc}>
              A curated destination for timeless apparel, artisanal footwear, and elevated living essentials. Designed with intention and crafted for longevity.
            </p>
            <div className={styles.newsletter}>
              <p className={styles.newsletterLabel}>Subscribe for private releases & journal stories.</p>
              <form onSubmit={handleNewsletter} className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Nav Column 1: Shop */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Catalog</h4>
            <ul className={styles.linkList}>
              <li><Link to="/shop">All Collections</Link></li>
              <li><Link to="/shop?category=clothing">Tailored Apparel</Link></li>
              <li><Link to="/shop?category=footwear">Artisanal Shoes</Link></li>
              <li><Link to="/shop?category=accessories">Watches & Leather</Link></li>
              <li><Link to="/shop?category=home">Home & Interior</Link></li>
              <li><Link to="/shop?category=beauty">Clean Wellness</Link></li>
            </ul>
          </div>

          {/* Nav Column 2: Experience */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Assistance</h4>
            <ul className={styles.linkList}>
              <li><Link to="/order-tracking">Track Consignment</Link></li>
              <li><Link to="/account">Customer Account</Link></li>
              <li><Link to="/wishlist">Saved Artifacts</Link></li>
              <li><Link to="/cart">Review Bag</Link></li>
              <li><Link to="/admin">Internal Portal</Link></li>
            </ul>
          </div>

          {/* Nav Column 3: Ethos */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>The Atelier</h4>
            <p className={styles.ethosText}>
              Every garment and object in our catalog adheres to strict standards of material provenance, equitable craftsmanship, and enduring design integrity.
            </p>
            <div className={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Globe size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <Share2 size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Compass size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} VIGNESH STORE. Crafted with Google Antigravity & Taste-Skill guidelines.
          </p>
          <div className={styles.paymentBadges}>
            <span>UPI Verified</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>RuPay</span>
            <span>NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
