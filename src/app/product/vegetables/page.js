"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://pasumai-e-commerce-consultancy.vercel.app/api/get-product/vegetable",
        { cache: "no-store" }
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const qtyStr = prompt(`Enter quantity (kg) for ${product.name}:`, "1");
    const qty = parseFloat(qtyStr);
    if (!qty || qty <= 0) return;

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const res = await fetch("/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, cart }),
    });
    const data = await res.json();
    alert(data.message || "Order placed!");
    setCart([]);
    setFormData({ name: "", phone: "", address: "" });
  };

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-green-400 to-lime-500 text-transparent bg-clip-text">
          Healthy Vegetables! 🥦🥕🍅
        </h1>
        <p className="text-gray-500 mt-2">Your daily dose of vitamins, delivered.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4">
        {/* Product Grid */}
        <div className="flex-1 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="relative w-full h-64 rounded-t-2xl overflow-hidden">
                <Image
                  src={product.cdnPath}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="text-xl font-semibold text-gray-800">{product.name}</div>
                <div className="text-sm text-gray-500">{product.type}</div>
                <div className="text-green-600 font-bold text-lg mt-2">
                  ₹{product.price}/kg
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart + Checkout Sidebar */}
        <div className="w-full lg:w-80 bg-white shadow-xl rounded-xl p-6 h-fit sticky top-6 self-start space-y-6">
          <div>
            <h2 className="text-xl font-bold text-green-700">🛒 Your Cart</h2>
            {cart.length > 0 ? (
              <ul className="space-y-3 mt-4 max-h-64 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <li key={idx} className="border-b pb-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        {item.name} <span className="text-gray-500">({item.quantity} kg)</span>
                      </span>
                      <span className="text-green-600 font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">Your cart is empty.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-green-700">📦 Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Delivery Address"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
