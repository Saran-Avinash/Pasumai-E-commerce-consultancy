import clientPromise from "@/lib/mongodb";
import { ObjectId, ReturnDocument } from "mongodb";

export default async function handler(req, res)  {

    if(req.method != 'PUT'){
        return res.status(405).json({message : 'ONLY PUT allowed'});
    }

    try{    
        const { name, price, description, type, quantity, cdnPath } = req.body;
        const updateProduct = {
            name,
            price,
            description: description || '',
            type,
            quantity,
            cdnPath,
          };
        const client = await clientPromise;
        const db = client.db('SuperMarket');
        const productCollection = db.collection('products');

        const result = await productCollection.findOneAndUpdate( {_id: new ObjectId(req.query.id)}, { $set : updateProduct}, {ReturnDocument : "after"} );
        console.log(result);
        return res.json({message : result})
    }
    catch(error){
        console.log(error);
    }
}