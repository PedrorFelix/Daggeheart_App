import { Feature } from "../types/database";

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

export function FeatureCard({
    feature,
    color,
    index,
}: {
    feature: Feature;
    color: string;
    index?: number;
}) {
    return (
        <article
            className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
            style={{
                borderColor: color,
                animation: `fadeUp 0.5s ${index === undefined? 0 : index * 0.1 }s both`,
            }}
        >
            <h3 className="text-xl font-bold mb-3" style={{ color }}>
                {feature.name}
            </h3>

            <p className="text-gray-300 leading-relaxed">
                {feature.description}
            </p>
        </article>
    );
}