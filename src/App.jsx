import React, { useState, useEffect, useMemo } from "react";

const SAMPLE_PRODUCTS = [
  {
    id: "tl-001",
    title: "Turbo Life - Speed Tee",
    price: 24,
    colors: ["White", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=60",
    tags: ["t-shirt", "graphic", "car"],
    desc: "Clean minimal t-shirt with Turbo Life scripted logo and speed stripes."
  },
  {
    id: "tl-002",
    title: "Turbo Life - Boost Hoodie",
    price: 49,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60",
    tags: ["hoodie", "cozy", "car"],
    desc: "Thick pullover hoodie with Turbo Life front badge and subtle sleeve print."
  }
];

function currency(n) {
  return `$${n.toFixed(2)}`;
}

function useCart() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("turbolife_cart")) || []);
  useEffect(() => { localStorage.setItem("turbolife_cart", JSON.stringify(items)); }, [items]);
  const add = (product, qty = 1, opts = {}) => {
    setItems(cur => [...cur, { ...product, qty, opts }]);
  };
  const remove = (index) => setItems(cur => cur.filter((_, i) => i !== index));
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  return { items, add, remove, subtotal };
}

export default function App() {
  const cart = useCart();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex justify-between">
        <h1 className="font-bold text-2xl">Turbo Life</h1>
        <div>Cart Items: {cart.items.length}</div>
      </header>
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_PRODUCTS.map(p => (
            <div key={p.id} className="border p-4 rounded shadow">
              <img src={p.img} alt={p.title} className="w-full h-40 object-cover mb-2" />
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-slate-500">{p.desc}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold">{currency(p.price)}</span>
                <button onClick={() => cart.add(p)} className="bg-slate-900 text-white px-3 py-1 rounded">Add</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center text-slate-500 p-4 border-t">© Turbo Life {new Date().getFullYear()}</footer>
    </div>
  );
}
