import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      login({ email, password });
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <section className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <p className="muted">Demo login (stored locally in your browser).</p>

        {location.state?.reason ? <div className="alert">{location.state.reason}</div> : null}
        {error ? <div className="alert">{error}</div> : null}

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <button className="btn btn-primary btn-block" type="submit">
            Login
          </button>
        </form>

        <p className="muted">
          New here? <Link className="link" to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

