import CardButton from "@/app/components/CardButton";

export default function HomePage() {
  return (
    <div className="p-4 sm:p-8 lg:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-8 sm:mb-12 lg:mb-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white">
            Daggerheart Quick Guide
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
          {/* Static buttons - no color/icon provided */}
          <CardButton name="Domains" href="/domains" />
          <CardButton name="Ancestry" href="/ancestry" />
          <CardButton name="Classes" href="/" />
          <CardButton name="Equipment" href="/" />
          <CardButton name="Random Gen." href="/" />
        </div>
      </div>
    </div>
  );
}