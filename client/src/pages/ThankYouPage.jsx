import { Link } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function ThankYouPage() {
  const { user } = useAuth();

  return (
    <section className="thanks">
      <div className="thanks-card">
        <h2 className="thanks-title">Thank you{user?.name ? `, ${user.name}` : ''}.</h2>
        <p className="muted">
          Your order has been placed (demo checkout). No payment was taken.
        </p>
        <div className="thanks-actions">
          <Link className="btn btn-primary" to="/">
            Back to products
          </Link>
          <Link className="btn btn-ghost" to="/cart">
            View cart
          </Link>
        </div>
      </div>
    </section>
  );
}

