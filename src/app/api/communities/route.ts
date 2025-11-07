import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { CommunityResponse } from "@/app/types/database";

export async function GET(request: Request){
    try{

        const { searchParams } = new URL (request.url);
        const communityName = searchParams.get("community");

        if(!communityName){
            return NextResponse.json({error: "Community parameter required"}, {status: 400});
        }

        const { db } = await connectToDatabase();

        const community = await db.collection("backgrounds").findOne({name: communityName});

        if(!community){
            console.log("BCommunity not found");
            return NextResponse.json({ error: "Community not found"}, {status: 404});
        }

        console.log("Communityd found:", {
            id: community._id,
            name: community.name,
            hasDescription: !!community.description
        });

        const response : CommunityResponse = {
            community: {
                _id: community._id.toString(),
                name:  community.name,
                description: community.description,
                feature: community.feature
            }
        };

        return NextResponse.json(response);

    }catch(error){
        console.error("=== API Route Error ===");
        console.error("Error details:", error);
        console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
        
        return NextResponse.json({
            error: "Internal server error", 
            details: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}