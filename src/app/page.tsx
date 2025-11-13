import CardButton from "@/app/components/CardButton";
import { BasicPageHeader } from "./components/PageHeader";

const sections = [
    {name: "Domains", href: "/domains", color: "#FFFFFF", icon: "/aff_domains.svg", active: true},
    {name: "Heritage", href: "/heritages", color: "#FFFFFF", icon: "/aff_species.svg", active: true},
    {name: "Classes", href: "/classes", color: "#FFFFFF", active: true},
    {name: "Character Creation", href: "/random", active: false},
    {name: "Rule Guide", href: "/rules", active: false},
    {name: "Equipment", href: "/equipment", active: false},
];

export default function HomePage() {
    return (
        <div className="p-4 sm:p-8 lg:p-20">
            <div className="max-w-7xl mx-auto">
                <BasicPageHeader/>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 justify-items-center">
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