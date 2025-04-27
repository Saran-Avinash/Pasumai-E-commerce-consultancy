// pages/api/add-product.js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('SuperMarket'); // replace with your actual db name
    const productsCollection = db.collection('products');

    const { name, price, description, type, quantity, fileName } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newProduct = {
      name,
      price,
      description: description || '',
      type,
      quantity,
      fileName,
      createdAt: new Date(),
    };

    const result = await productsCollection.insertOne(newProduct);

    res.status(201).json({ message: 'Product added', productId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
