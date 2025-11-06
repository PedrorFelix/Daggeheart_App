import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { SpeciesResponse } from "@/app/types/database";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const speciesName = searchParams.get("species");

        if(!speciesName){
            return NextResponse.json({ error: "Species parameter required" }, { status: 400 });
        }

        const { db } = await connectToDatabase();

        const species = await db.collection("species").findOne({name: speciesName});

        if(!species){
            console.log("Species not found");
            return NextResponse.json({
                error: "Species Not Found"
            }, { status: 404 });
        }

        console.log("Species found:", {
            id: species._id,
            name: species.name,
            hasDescription: !!species.description
        });

        const response: SpeciesResponse = {
            species: {
                _id: species._id.toString(),
                name: species.name,
                description: species.description,
                Features: species.Features
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