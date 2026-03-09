import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

const API_URL = '/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <p className="hint">Make sure the server is running and DATABASE_URL is set.</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return <ProductList products={products} />;
}

