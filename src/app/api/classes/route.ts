import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { ClassResponse } from "@/app/types/database";
import { error } from "console";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const className  = searchParams.get("class");

        if(!className){
            return NextResponse.json({ error: " Class parameter required "}, {status: 400});
        }

        const { db } = await connectToDatabase();

        const ch_class = await db.collection("classes").findOne(({name: className}));

        if(!ch_class){
            console.log("Class not found");
            return NextResponse.json({
                error: "Class Not Found"
            },{ status: 404});
        }

        console.log("Class found:", {
            id:ch_class._id,
            name: ch_class.name,
            hasDescription: !!ch_class.description
        });

        const response: ClassResponse = {
            class: {
                _id: ch_class._id.toString(),
                name: ch_class.name,
                description: ch_class.description,
                domains: ch_class.domains,
                evasion: ch_class.evasion,
                hp: ch_class.hp,
                hopeFeature: ch_class.hopeFeature,
                classFeature: ch_class.classFeature,
                subclasses: ch_class.subclasses,
                questions: ch_class.questions,
                connections: ch_class.connections,
                classItem: ch_class.classItem
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