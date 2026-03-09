import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../state/cart';
import { useAuth } from '../state/auth';

function money(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

export default function CartPage() {
  const { items, subtotal, increment, decrement, setQuantity, removeFromCart, clearCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const hasItems = items.length > 0;

  return (
    <section className="cart">
      <div className="cart-header">
        <div>
          <h2 className="section-title">Your Cart</h2>
          <p className="hint">
            Realtime updates: quantities and totals change instantly.
          </p>
        </div>
        <Link className="btn btn-ghost" to="/">
          Continue shopping
        </Link>
      </div>

      {!hasItems ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <p className="hint">Add some products to see them here.</p>
          <Link className="btn btn-primary" to="/">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {items.map((i) => (
              <article className="cart-item" key={i.productId}>
                <div className="cart-item-img">
                  <img
                    src={i.image_url || 'https://via.placeholder.com/200x200?text=No+Image'}
                    alt={i.name}
                    loading="lazy"
                  />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <h3 className="cart-item-name">{i.name}</h3>
                      {i.category ? (
                        <p className="cart-item-meta">{i.category}</p>
                      ) : null}
                    </div>
                    <button
                      className="btn btn-link"
                      onClick={() => removeFromCart(i.productId)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="qty">
                      <button className="qty-btn" onClick={() => decrement(i.productId)}>
                        −
                      </button>
                      <input
                        className="qty-input"
                        type="number"
                        min="1"
                        value={i.quantity}
                        onChange={(e) => setQuantity(i.productId, e.target.value)}
                      />
                      <button className="qty-btn" onClick={() => increment(i.productId)}>
                        +
                      </button>
                    </div>

                    <div className="cart-item-price">
                      <span className="muted">{money(i.price)} each</span>
                      <span className="strong">{money(i.price * i.quantity)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="summary">
            <h3 className="summary-title">Order summary</h3>
            <div className="summary-row">
              <span className="muted">Subtotal</span>
              <span className="strong">{money(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="muted">Shipping</span>
              <span className="strong">{money(0)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{money(subtotal)}</span>
            </div>

            {!user ? (
              <div className="summary-note">
                <p className="muted">
                  Please login to proceed (demo login stored locally).
                </p>
                <Link className="btn btn-primary" to="/login">
                  Login to proceed
                </Link>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-block"
                onClick={() => {
                  clearCart();
                  navigate('/thank-you');
                }}
              >
                Proceed
              </button>
            )}

            <button className="btn btn-ghost btn-block" onClick={clearCart}>
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

