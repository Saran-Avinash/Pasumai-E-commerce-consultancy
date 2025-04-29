import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export default async function handler(req, res){

    if(req.method != 'DELETE'){
        return res.status(405).json({ message : 'ONLY DELETE allowed'})
    }

    try{
        const client = await clientPromise;
        const db = client.db('SuperMarket');
        const productCollection = db.collection("products");

       const result = await productCollection.deleteOne({_id : new ObjectId(req.query.id)})
        console.log(result);
        return res.json({message : 'success'})
    }
    catch(error){
        console.error('Failed to delete the specified product with id ' , req.query.id, error);
        return res.status(500).json({ error: "Failed to delete product" });

    }
}