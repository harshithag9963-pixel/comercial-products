import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setSubmitting(true);
      await signup({ name, email, password });
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="muted">Demo signup (stored locally in your browser).</p>

        {location.state?.reason && !error ? (
          <div className="alert">{location.state.reason}</div>
        ) : null}
        {error ? <div className="alert">{error}</div> : null}

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
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
              placeholder="Create a password"
              minLength={4}
              required
            />
          </label>
          <button className="btn btn-primary btn-block" type="submit">
            {submitting ? 'Creating…' : 'Sign up'}
          </button>
        </form>

        <p className="muted">
          Already have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

