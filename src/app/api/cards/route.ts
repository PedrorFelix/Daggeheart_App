import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET (request: Request) {
    const {searchParams} = new URL(request.url);
    const domainName = searchParams.get("domain");

    if(!domainName){
        return NextResponse.json({ error: "Domain Not Found" }, {status: 400});
    }

    try {
        const { db } = await connectToDatabase();

        /*Fetch the data
        Find the domain object id*/
        const domain = await db.collection("domains")
        .findOne({title: domainName}) //get all data from domain by searching domain name

        if(!domain){
            return NextResponse.json({error: "Domain Not Found" }, {status: 404});
        }

        //Find the domain cards with the domain id
        const cards = await db.collection("abilities")
        .find({domain_id: new ObjectId(domain._id)}) //id i got from last querry
        .project({title: 1, description: 1}) //choose the values I want
        .toArray();

        return NextResponse.json({
            domain: {
                _id: domain._id,
                name: domain.name,
                description: domain.description
            },
            cards
        });
    }catch(error){
        console.error("Error fetching cards", error);
        return NextResponse.json({error: "Failed to fetch cards"}, {status: 500});
    }

}