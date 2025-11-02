import CardButton from "@/app/components/CardButton";

const sections = [
  {name: "Domains", href: "/domains", color: "#40454e", icon: "/aff_domains.svg", active: true},
  {name: "Ancestry", href: "/ancestry", active: false},
  {name: "Classes", href: "/classes", active: false},
  {name: "Equipment", href: "/equipment", active: false},
  {name: "Random Gen", href: "/random", active: false},
];

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
          {/* Card Buttons for all sections*/}

          {sections.map((section, index) => (
              <div key={section.name} className="relative w-full flex justify-center">
                <CardButton
                  name={section.active? section.name: section.name+'\nComing Soon'}
                  href={section.active ? section.href : "#"}
                  color={section.active? section.color: undefined}
                  icon={section.active? section.icon: undefined}
                  index={index}
                />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}