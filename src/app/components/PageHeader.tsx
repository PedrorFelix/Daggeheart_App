export function PageHeader({
    name,
    description,
    color,
}: {
    name: string;
    description: string;
    color: string;
}) {
    return (
        <header className="text-left mb-8 sm:mb-12 lg:mb-16">
            <h1
                className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6"
                style={{ color }}
            >
                {name}
            </h1>
            <p className="text-lg text-gray-300 max-w-4xl leading-relaxed">
                {description}
            </p>
        </header>
    );
}

export  function BasicPageHeader(){
    return(
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white">
                Daggerheart Quick Guide
            </h1>
        </div>
    );
};