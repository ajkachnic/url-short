import { MongoClient } from 'mongodb'
console.log(process.env.MONGODB_URI)
const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})

export default async function database(req, res, next) {
    if(!client.isConnected()) await client.connect();
    req.dbClient = client;
    
    req.db = client.db(process.env.DB_NAME);
    return next();
}

