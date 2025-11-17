import { Feature } from "../types/database";
import { FeatureCard } from "./FeatureCard";

export function FeaturesGrid({
    features,
    color,
}: {
    features: [Feature] | [Feature, Feature] | [Feature, Feature, Feature];
    color: string;
}) {
    return (
        <section className="mb-8">
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