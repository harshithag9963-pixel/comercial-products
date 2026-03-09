import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products yet.</p>
        <p className="hint">Run <code>npm run db:seed</code> to add sample products.</p>
      </div>
    );
  }

  return (
    <section className="products-section">
      <h2 className="section-title">Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
