export default function ErrorMessage() {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
            <p className="text-lg text-gray-300 mb-4">
                Failed to load data. Please try again later.
            </p>
        </div>
    );
}