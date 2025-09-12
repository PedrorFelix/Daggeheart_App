import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET (request: Request) {
    
    try {
        const {searchParams} = new URL(request.url);
        const domainName = searchParams.get("domain");

        if(!domainName){
            return NextResponse.json({ error: "Domain parameter required" }, {status: 400});
        }

        const { db } = await connectToDatabase();

        // Search for the specific domain
        const domain = await db.collection("domains").findOne({title: domainName});

        if(!domain){
            console.log("Domain not found");
            return NextResponse.json({
                error: "Domain Not Found"
            }, {status: 404});
        }

        console.log("Domain found:", {
            id: domain._id,
            title: domain.title,
            hasDescription: !!domain.description
        });

        // Handle domnain id as ObjectId 
        let domainObjectId;
        try {
            domainObjectId = domain._id instanceof ObjectId ? domain._id : new ObjectId(domain._id);
        } catch (objectIdError) {
            console.error("Error creating ObjectId:", objectIdError);
            return NextResponse.json({error: "Invalid domain ID"}, {status: 500});
        }

        // fetch cards by domain id
        const cards = await db.collection("abilities")
            .find({domain_id: domainObjectId})
            .project({title: 1, description: 1, level: 1, type: 1, recall_cost: 1})
            .toArray();

        const response = {
            domain: {
                _id: domain._id,
                title: domain.title,
                description: domain.description
            },
            cards: cards
        };

        return NextResponse.json(response);

    } catch(error) {
        console.error("=== API Route Error ===");
        console.error("Error details:", error);
        console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
        
        return NextResponse.json({
            error: "Internal server error", 
            details: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
        }, {status: 500});
    }
}