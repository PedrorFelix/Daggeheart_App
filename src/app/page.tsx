import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white">
            Daggerheart Quick Guide
          </h1>
        </div>

        {/* Navigation Link */}
        <div className="mb-8 grid grid-cols-1">
          <Link 
            href="/domains"
            className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg"
          >
          Domains
          </Link>
          <Link 
            href="/classes"
            className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg"
          >
          Classes
          </Link>
          <Link 
            href="/ancestry"
            className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg"
          >
          Ancestry
          </Link><Link 
            href="/Characters"
            className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg"
          >
          Characters
          </Link>
        </div>

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 lg:h-16"></div>
      </div>
    </div>
  );
}