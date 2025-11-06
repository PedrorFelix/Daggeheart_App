import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{client: MongoClient; db: Db}> {

    // Check if we have a cached connection
    if (cachedClient && cachedDb) {
        try {
            // Test the connection
            await cachedClient.db("admin").command({ ping: 1 });
            return { client: cachedClient, db: cachedDb };
        } catch (error) {
            console.error("Cached connection failed, resetting cache", error);
            // Connection is stale, reset cache
            cachedClient = null;
            cachedDb = null;
        }
    }

    // Create new connection
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI environment variable is not set");
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log("MongoDB client connected");
        const db = client.db("DH_database");
        await db.command({ ping: 1 });
        
        // Cache the connection
        cachedClient = client;
        cachedDb = db;

        console.log("MongoDB connection established and cached");
        
        return { client, db };
    } catch (error) {
        console.error("Failed to connect to MongoDB - Full error:", error);
        console.error("Error name:", error instanceof Error ? error.name : "Unknown");
        console.error("Error message:", error instanceof Error ? error.message : "Unknown error");
        throw new Error(`Database connection failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}