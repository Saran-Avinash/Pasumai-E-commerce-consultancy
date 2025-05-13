"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://pasumai-e-commerce-consultancy.vercel.app/api/get-product/fruit",
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const quantity = parseInt(prompt(`Enter quantity (kg) for ${product.name}:`, 1));
    if (!quantity || quantity <= 0) return;

    const existingIndex = cart.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const res = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, address, cart }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-green-400 to-lime-500 text-transparent bg-clip-text">
          Fresh & Juicy Fruits Await! 🍓🍊🍍
        </h1>
        <p className="text-gray-500 mt-2">Your daily dose of vitamins, delivered.</p>
      </div>

      <div className="p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              <div className="text-xl font-semibold text-gray-800">
                {product.name}
              </div>
              <div className="text-sm text-gray-500">{product.type}</div>
              <div className="text-green-600 font-bold text-lg mt-2">
                ₹{product.price}/kg
              </div>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-10 p-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <div className="mt-4">
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="border-b py-2">
                  <div className="flex justify-between">
                    <span>
                      {item.name} - {item.quantity} kg
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Checkout Form */}
      <div className="mt-10 p-4 max-w-xl mx-auto bg-gray-50 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
        <form onSubmit={handleOrderSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Place Order & Send Email
          </button>
        </form>
      </div>
    </>
  );
}
