import { Feature } from "../types/database";

export  function FeatureCard({
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