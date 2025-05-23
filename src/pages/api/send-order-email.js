import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, phone, address, cart } = req.body;

  const emailContent = `
    <h2>New Order from ${name}</h2>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <h3>Cart Items:</h3>
    <ul>
      ${cart.map(item => `<li>${item.name} - ${item.quantity} kg - ₹${item.price * item.quantity}</li>`).join("")}
    </ul>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "www.sk0013689@gmail.com",
      pass: "tznq fyjr pjje wjaw", // use App Password, not normal password
    },
  });

  try {
    await transporter.sendMail({
      from: '"Pasumai Fruits" <yourgmail@gmail.com>',
      to: "saranbaskarmsp@gmail.com",
      subject: `New Fruit Order from ${name}`,
      html: emailContent,
    });

    res.status(200).json({ message: "Order placed and email sent successfully!" });
    
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email." });
  }

  try{
    const client = await clientPromise;
    const db = client.db('SuperMarket');
    const orderCollection = db.collection('orders');

    const newOrder = {
      name, 
      phone, address, cart,
      createdAt: new Date(),
    }

    const result = orderCollection.insertOne(newOrder);
    res.status(201).json({ message: 'Order added', productId: result.insertedId });

  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
