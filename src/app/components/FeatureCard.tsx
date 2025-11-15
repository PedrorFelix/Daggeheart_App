export  function FeatureCard({
    feature,
    color,
    index,
}: {
    feature: [2];
    color: string;
    index: number;
}) {
    return (
        <article
            className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
            style={{
                borderColor: color,
                animation: `fadeUp 0.5s ${index * 0.1}s both`,
            }}
        >
            <h3 className="text-xl font-bold mb-3" style={{ color }}>
                {feature[0]}
            </h3>

            <p className="text-gray-300 leading-relaxed">
                {feature[1]}
            </p>
        </article>
    );
}

export  function HopeFeatureCard({
    name,
    feature,
    color
}: {
    name: string;
    feature: [2];
    color: string;
}) {
    return (
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4" style={{ color }}>
                    {name + "'s"}  Hope Feature
            </h2>
            <article className="p-6 rounded-lg border-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
                style={{ borderColor: color }}>
                <h3 className="text-l font-bold mb-3">
                    {feature[0]}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                    {feature[1]}
                </p>
            </article>
        </div>
    );
}