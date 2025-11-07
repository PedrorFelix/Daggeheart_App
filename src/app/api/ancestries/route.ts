import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { AncestryResponse } from "@/app/types/database";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const ancestryName = searchParams.get("ancestry");

        if(!ancestryName){
            return NextResponse.json({ error: "Ancestry parameter required" }, { status: 400 });
        }

        const { db } = await connectToDatabase();

        const ancestry = await db.collection("species").findOne({name: ancestryName});

        if(!ancestry){
            console.log("Ancestry not found");
            return NextResponse.json({
                error: "Ancestry Not Found"
            }, { status: 404 });
        }

        console.log("Ancestry found:", {
            id: ancestry._id,
            name: ancestry.name,
            hasDescription: !!ancestry.description
        });

        const response: AncestryResponse = {
            ancestry: {
                _id: ancestry._id.toString(),
                name: ancestry.name,
                description: ancestry.description,
                Features: ancestry.Features
            }
        };

        return NextResponse.json(response);

    }catch(error) {
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