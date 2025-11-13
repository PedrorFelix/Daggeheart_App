import Link from "next/link";

export default function ReturnButton({ color, destination, direction }: { color: string, destination: string, direction: string }) {
    let textColor = "#FFFFFF";
    if (color === "#FFFFFF") {
        textColor = "#101828";
    }
    return (
        <div className="mb-8">
            <Link
                href={destination}
                className="inline-block px-6 py-3 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: color, color: textColor }}
            >
                ← Back to {direction}
            </Link>
        </div>
    );
}