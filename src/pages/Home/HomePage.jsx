import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  getTrendingProducts,
  getBestSellers,
  getNewArrivals,
  categories,
  testimonials,
} from '../../data/products';
import SectionHeading from '../../components/common/SectionHeading';
import ProductCard from '../../components/common/ProductCard';
import styles from './HomePage.module.css';

/* ── animation variants ───────────────────────── */
const textVariants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const imgVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.14 } },
};

/* ── data ─────────────────────────────────────── */
const trendingProducts = getTrendingProducts().slice(0, 4);
const bestSellers      = getBestSellers().slice(0, 4);
const newArrivals      = getNewArrivals().slice(0, 4);

export default function HomePage() {
  /* Newsletter submit */
  const handleNewsletter = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <main className={styles.page}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroText}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={textVariants} className={styles.eyebrow}>
            New Collection
          </motion.span>
          <motion.h1 variants={textVariants} className={styles.heroHeading}>
            Dressed for Every Chapter of Life
          </motion.h1>
          <motion.p variants={textVariants} className={styles.heroSub}>
            Thoughtfully crafted clothing and lifestyle goods for the moments that define you.
            Premium materials, timeless silhouettes, mindful living.
          </motion.p>
          <motion.div variants={textVariants} className={styles.heroCtas}>
            <Link to="/shop" className={styles.btnPrimary}>Shop Collection</Link>
            <Link to="/shop?category=clothing" className={styles.btnGhost}>View Lookbook <ArrowRight size={16} /></Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroImage}
          variants={imgVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
            alt=""
            className={styles.heroImg}
            role="presentation"
          />
        </motion.div>
      </section>

      {/* ══ FEATURED CATEGORIES ═══════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading eyebrow="Our World" title="Shop by Category" />
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className={styles.categoryTile}
              >
                <div className={styles.categoryImgWrap}>
                  <img src={cat.image} alt="" className={styles.categoryImg} role="presentation" />
                  <div className={styles.categoryOverlay} />
                </div>
                <span className={styles.categoryName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRENDING ══════════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading eyebrow="What's Hot" title="Trending Now" />
          <div className={styles.productRow}>
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className={styles.sectionLink}>
            <Link to="/shop?sort=trending" className={styles.textLink}>
              View All Trending <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ EDITORIAL MOMENT ══════════════════════════════════════════════ */}
      <section className={styles.editorial}>
        <div className={styles.editorialImg}>
          <img
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80"
            alt=""
            role="presentation"
            className={styles.editorialPhoto}
          />
        </div>
        <motion.div
          className={styles.editorialText}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <blockquote className={styles.editorialQuote}>
            "Style isn't what you wear. It's how you live."
          </blockquote>
          <p className={styles.editorialSub}>
            Our editorial picks blend form with function — pieces that earn a permanent place in
            your wardrobe and your life.
          </p>
          <Link to="/shop" className={styles.btnPrimary}>Explore the Edit</Link>
        </motion.div>
      </section>

      {/* ══ BEST SELLERS ══════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading eyebrow="Customer Favourites" title="Best Sellers" />
          <div className={styles.productRow}>
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className={styles.sectionLink}>
            <Link to="/shop?sort=bestsellers" className={styles.textLink}>
              Shop All Best Sellers <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PROMO BANNER ══════════════════════════════════════════════════ */}
      <section className={styles.promoBanner}>
        <div className={styles.container}>
          <p className={styles.promoText}>
            UP TO 30% OFF SELECTED STYLES · Limited Time
          </p>
          <Link to="/shop?sale=true" className={styles.btnTerracotta}>Shop Sale</Link>
        </div>
      </section>

      {/* ══ NEW ARRIVALS ══════════════════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading eyebrow="Just In" title="New Arrivals" />
          <div className={styles.productRow}>
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className={styles.sectionLink}>
            <Link to="/shop?sort=newest" className={styles.textLink}>
              See All New Arrivals <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <SectionHeading eyebrow="What They Say" title="From Our Customers" />
          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <blockquote className={styles.testimonialQuote}>"{t.text}"</blockquote>
                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialName}>{t.name}</span>
                  <span className={styles.testimonialLoc}>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.newsletter}`}>
        <div className={styles.container}>
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterLeft}>
              <h2 className={styles.newsletterHeading}>Join the Circle</h2>
              <p className={styles.newsletterSub}>
                Be the first to know about new collections, exclusive offers, and style stories
                from Vignesh Store.
              </p>
              <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.btnTerracotta}>Subscribe</button>
              </form>
              <p className={styles.newsletterNote}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
