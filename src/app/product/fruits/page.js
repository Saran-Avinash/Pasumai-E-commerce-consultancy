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
        { cache: "no-store" }
      );
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const isValidQuantity = (value) => {
    const number = Number(value);
    return Number.isInteger(number) && number > 0;
  };

  const addToCart = (product) => {
    const input = prompt(`Enter quantity (kg) for ${product.name}:`, 1);
    if (!isValidQuantity(input)) {
      alert("Please enter a valid positive number.");
      return;
    }

    const quantity = parseInt(input);
    const existingIndex = cart.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const updateQuantity = (id) => {
    const input = prompt("Enter new quantity:");
    if (!isValidQuantity(input)) {
      alert("Please enter a valid positive number.");
      return;
    }

    const quantity = parseInt(input);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const res = await fetch("/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, address, cart }),
    });

    const data = await res.json();
    alert(data.message);
    setCart([]);
  };

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-green-400 to-lime-500 text-transparent bg-clip-text">
          Fresh & Juicy Fruits Await! 🍓🍊🍍
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
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="w-full lg:w-80 bg-white shadow-xl rounded-xl p-6 h-fit sticky top-6 self-start space-y-6">
          <div>
            <h2 className="text-xl font-bold text-green-700">🛒 Your Cart</h2>
            {cart.length > 0 ? (
              <>
                <ul className="space-y-3 mt-4 max-h-64 overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <li key={index} className="border-b pb-2 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>
                          {item.name}{" "}
                          <span className="text-gray-500">({item.quantity} kg)</span>
                        </span>
                        <span className="text-green-600 font-semibold">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => decrementQuantity(item._id)}
                          className="bg-red-100 px-2 rounded hover:bg-red-200"
                        >
                          -
                        </button>
                        <button
                          onClick={() => incrementQuantity(item._id)}
                          className="bg-green-100 px-2 rounded hover:bg-green-200"
                        >
                          +
                        </button>
                        <button
                          onClick={() => updateQuantity(item._id)}
                          className="bg-blue-100 px-2 rounded hover:bg-blue-200 text-xs"
                        >
                          Update
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={clearCart}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Clear Cart
                </button>
              </>
            ) : (
              <p className="text-gray-500 mt-2">Your cart is empty.</p>
            )}
          </div>

          {/* Checkout Form */}
          <div>
            <h2 className="text-xl font-bold text-green-700">📦 Delivery Details</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
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
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
