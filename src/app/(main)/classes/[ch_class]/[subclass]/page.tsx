
import ErrorMessage from "@/app/components/ErrorMessage";
import { FeaturesGrid } from "@/app/components/FeatureGrid";
import { InfoSquare } from "@/app/components/InfoSquares";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { PageHeader } from "@/app/components/PageHeader";
import ReturnButton from "@/app/components/ReturnButton";
import type { SubclassResponse } from "@/app/types/database";
import { Suspense } from "react";

type SubclassPageProps = {
    params: Promise<{
        subclass: string;
    }>;
};

async function fetchSubclassData(subclassName: string): Promise<SubclassResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/subclasses?subclass=${subclassName}`,
        {
            next: {
                revalidate: 3600, // caches for 1h
            },
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch subclass data: ${res.status}`);
    }

    return res.json();
}

export default async function SubclassPage({ params }: SubclassPageProps) {
    const { subclass: subclassName } = await params;

    let data: SubclassResponse;

    try{
        data = await fetchSubclassData(subclassName)
    }catch (error) {
        console.error("Error fetching class data:", error);
        return (
                <div className="p-4 sm:p-8 lg:p-20">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <ReturnButton color={"#FFFFFF"} destination="/classes" direction="Classes"/>
                        <ErrorMessage />
                    </div>
                </div>
            );
    }
    
    return(
        <div className="p-4 sm:p-8 lg:p-20">
            <Suspense fallback={<LoadingAnimation message="Loading class data..." />}>
                <PageHeader name={data.subclass.name} description={data.subclass.description} color={"#FFFFFF"}/>
                
                <ReturnButton color={"#FFFFFF"} destination={`/classes/${data.subclass.class}`} direction={data.subclass.class}/>

                <section className="grid sm:grid-cols-1 md:grid-cols-4">
                    <article className="grid gap-6 grid-cols-2 justify-items-center mb-8 p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm"style={{ borderColor: "#FFFFFF" }}>
                        <InfoSquare info= {[ data.subclass.class, "Subclass of"]} color = "#FFFFFF" />
                        <InfoSquare info= {[ "Spell Casting", data.subclass.spellcastTrait?.toString() === undefined?"No": data.subclass.spellcastTrait]} color = "#FFFFFF" />
                    </article>
                </section>

                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 mt-6 sm_mt-8" style = {{color: "#FFFFFF"}}> Foundation Features</h2>
                <FeaturesGrid  features={data.subclass.foundationFeature?? [{name:"Feature Name Not Found", description: "Feature Not Found"}]} color = {"#FFFFFF"} />
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 mt-6 sm_mt-8" style = {{color: "#FFFFFF"}}> Specialization Features (Unlock at Tier 3)</h2>
                <FeaturesGrid  features={data.subclass.specializationFeature?? [{name:"Feature Name Not Found", description: "Feature Not Found"}]} color = {"#FFFFFF"} />
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 mt-6 sm_mt-8" style = {{color: "#FFFFFF"}}> Mastery Features (Unlock at Tier 4)</h2>
                <FeaturesGrid  features={data.subclass.masteryFeature?? [{name:"Feature Name Not Found", description: "Feature Not Found"}]} color = {"#FFFFFF"} />

            </Suspense>
        </div>
    )
    
}