import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Only POST allowed' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('SuperMarket');
        const productsCollection = db.collection("products"); // Assuming 'products' is the collection name

    // Fetch all products
    const products = await productsCollection.find({type : req.query.type.toLowerCase()}).toArray();

    return res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }


}