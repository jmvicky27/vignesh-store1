import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { searchProducts } from '../../data/products';
import ProductCard from '../../components/common/ProductCard';
import styles from './SearchResultsPage.module.css';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchProducts(query);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>INQUIRY RESULTS</span>
        <h1 className={styles.title}>
          {query ? `Search for "${query}"` : 'Product Search'}
        </h1>
        <p className={styles.subtitle}>
          Found <strong>{results.length}</strong> matching creations in our catalog.
        </p>
      </div>

      {results.length === 0 ? (
        <div className={styles.emptyBox}>
          <SearchIcon size={44} className={styles.emptyIcon} />
          <h2>No creations match your query</h2>
          <p>Consider verifying spelling or exploring our broad seasonal categories.</p>
          <Link to="/shop" className={styles.returnBtn}>Explore All Collections</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
