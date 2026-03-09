import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('commercial_user_v1');
    return raw ? safeParse(raw, null) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('commercial_token_v1') || null);

  useEffect(() => {
    if (user) localStorage.setItem('commercial_user_v1', JSON.stringify(user));
    else localStorage.removeItem('commercial_user_v1');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('commercial_token_v1', token);
    else localStorage.removeItem('commercial_token_v1');
  }, [token]);

  async function signup({ name, email, password }) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    if (data.user) localStorage.setItem('commercial_user_v1', JSON.stringify(data.user));
    if (data.token) localStorage.setItem('commercial_token_v1', data.token);
    setUser(data.user);
    setToken(data.token);
  }

  async function login({ email, password }) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Login failed');
    if (data.user) localStorage.setItem('commercial_user_v1', JSON.stringify(data.user));
    if (data.token) localStorage.setItem('commercial_token_v1', data.token);
    setUser(data.user);
    setToken(data.token);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  const value = useMemo(() => ({ user, token, login, signup, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

