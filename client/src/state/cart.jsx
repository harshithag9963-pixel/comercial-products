import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name,
    description: p.description || '',
    price: Number(p.price),
    image_url: p.image_url || '',
    category: p.category || '',
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('commercial_cart_v1');
    const data = raw ? safeParse(raw, []) : [];
    return Array.isArray(data) ? data : [];
  });

  useEffect(() => {
    localStorage.setItem('commercial_cart_v1', JSON.stringify(items));
  }, [items]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + (i.quantity || 0), 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (i.quantity || 0) * Number(i.price || 0), 0),
    [items]
  );

  function addToCart(product, quantity = 1) {
    const p = normalizeProduct(product);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        {
          productId: p.id,
          name: p.name,
          price: p.price,
          image_url: p.image_url,
          category: p.category,
          quantity,
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function setQuantity(productId, quantity) {
    const q = Math.max(1, Number(quantity || 1));
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: q } : i))
    );
  }

  function increment(productId) {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  }

  function decrement(productId) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      setQuantity,
      increment,
      decrement,
      clearCart,
    }),
    [items, totalItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

