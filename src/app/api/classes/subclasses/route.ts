import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { SubclassResponse } from "@/app/types/database";
import { error } from "console";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const className  = searchParams.get("subclass");

        if(!className){
            return NextResponse.json({ error: " Subclass parameter required "}, {status: 400});
        }

        const { db } = await connectToDatabase();

        const subclass = await db.collection("subclasses").findOne(({name: className}));

        if(!subclass){
            console.log("Subclass not found");
            return NextResponse.json({
                error: "Subclass Not Found"
            },{ status: 404});
        }

        console.log("Class found:", {
            id:subclass._id,
            name: subclass.name,
            hasDescription: !!subclass.description
        });

        const response: SubclassResponse = {
            subclass: {
                _id: subclass._id.toString(),
                name: subclass.name,
                class: subclass.class,
                description: subclass.description,
                spellcastTrait: subclass.spellcastTrait,
                foundationFeature: subclass.foundationFeature,
                specializationFeature: subclass.specializationFeature,
                masteryFeature: subclass.masteryFeature
            }
        }

        return NextResponse.json(response);

    }catch{
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