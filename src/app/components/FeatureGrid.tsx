import { FeatureCard } from "./FeatureCard";

const gridSizes = [
    "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1",
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
]

export function FeaturesGrid({
    features,
    color,
}: {
    features: [];
    color: string;
}) {
    return (
        <section className="mb-8">
            <h2
                className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
                style={{ color }}
            >
                Ancestry Features
            </h2>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                        color={color}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}

export function ClassFeatureGrid({
    name,
    features,
    color
}:{
    name: string;
    features: [];
    color: string;
}){

    const gridSize = gridSizes[features.length-1];
    return(
        <section className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4" style={{ color }}>
                {name + "'s"}  Class Features
            </h2>

            <div className={`grid gap-4 sm:gap-6 ${gridSize}`}>
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                        color={color}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}