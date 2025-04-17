// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://saranbaskarmsp:saran123@supermarket.4rce2jo.mongodb.net/?retryWrites=true&w=majority&appName=SuperMarket"
const options = {};

let client;
let clientPromise;



if (process.env.NODE_ENV === 'development') {
  // Use global variable in development to prevent multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
