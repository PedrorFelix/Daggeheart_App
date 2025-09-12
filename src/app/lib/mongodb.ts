import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;  //global, uses an already created client , if it doesn't exist, initialized as null to hold the connectedClient after it's created


//connect to db function that returns the promise of client and db
export async function  connectToDatabase(): Promise<{client: MongoClient; db: Db}> {

    //use the client that already existed
    if(cachedClient){
        const db = cachedClient.db("dhCluster");
        return {client: cachedClient, db}; // the promise
    }

    //if no client exists
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    cachedClient = client;

    const db = cachedClient.db("dhCluster");

    return { client: cachedClient, db: db};
}