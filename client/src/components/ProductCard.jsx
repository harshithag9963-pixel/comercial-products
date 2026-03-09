import { useNavigate } from 'react-router-dom';
import { useCart } from '../state/cart';
import { useAuth } from '../state/auth';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const price = parseFloat(product.price).toFixed(2);

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.name}
          loading="lazy"
        />
        {product.category && (
          <span className="product-category">{product.category}</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${price}</span>
          <div className="product-actions">
            {product.in_stock !== false ? (
              <>
                <span className="in-stock">In Stock</span>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (!user) {
                      navigate('/login', {
                        state: {
                          from: '/',
                          reason: 'Please login to add items to your cart.',
                        },
                      });
                      return;
                    }
                    addToCart(product, 1);
                  }}
                >
                  Add to cart
                </button>
              </>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
