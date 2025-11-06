import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { BackgroundResponse } from "@/app/types/database";

export async function GET(request: Request){
    try{

        const { searchParams } = new URL (request.url);
        const backgroundName = searchParams.get("background");

        if(!backgroundName){
            return NextResponse.json({error: "Background parameter required"}, {status: 400});
        }

        const { db } = await connectToDatabase();

        const background = await db.collection("background").findOne({name: backgroundName});

        if(!background){
            console.log("Background not found");
            return NextResponse.json({ error: "Background not found"}, {status: 404});
        }

        console.log("Background found:", {
            id: background._id,
            name: background.name,
            hasDescription: !!background.description
        });

        const response : BackgroundResponse = {
            background: {
                _id: background._id.toString(),
                name:  background.name,
                description: background.description,
                feature: background.feature
            }
        }

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