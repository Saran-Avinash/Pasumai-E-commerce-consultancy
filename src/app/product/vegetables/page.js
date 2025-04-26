import Image from "next/image";

// Use async directly inside the server component
export default async function ProductsPage() {
  const res = await fetch("https://pasumai-e-commerce-consultancy.vercel.app/api/get-product/vegetable", {
    cache: "no-store", // Fetch data on every request
  });
  const products = await res.json();

  return (
    <>
    <div className="text-center my-10">
        <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-green-400 to-lime-500 text-transparent bg-clip-text">
          Healthy Vegetables! 🍓🍊🍍
        </h1>
        <p className="text-gray-500 mt-2">Your daily dose of vitamins, delivered.</p>
      </div>
<div className="p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="relative w-full h-100 rounded-t-2xl overflow-hidden">
              <Image
                src={`/products/${product.name}.jpg`}
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
            </div>
          </div>
        ))}
      </div>
      </>
  );
}
