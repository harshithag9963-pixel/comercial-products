import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../state/cart';
import { useAuth } from '../state/auth';

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="logo">
          Commercial
        </NavLink>
        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Products
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            Cart <span className="badge">{totalItems}</span>
          </NavLink>

          <div className="nav-sep" />

          {!user ? (
            <NavLink to="/login" className="btn btn-ghost">
              Account
            </NavLink>
          ) : (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button
                className="nav-link nav-button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
