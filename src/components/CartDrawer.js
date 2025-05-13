"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { X } from "lucide-react";

export default function CartDrawer() {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        🛒 Cart ({cart.length})
      </button>

      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-4 text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh]">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-start border-b pb-2">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  <div className="text-green-600 font-semibold text-sm">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="pt-4 border-t font-semibold">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
