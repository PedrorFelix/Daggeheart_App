import FeatureCard from "./FeatureCard";

export default function FeaturesGrid({
    features,
    color,
}: {
    features: { name: string; description: string }[];
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
                        key={feature.name}
                        feature={feature}
                        color={color}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}