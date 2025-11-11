import { Domain, domains } from "./domains"

export type Class = {
    name: string,
    domains: [Domain, Domain]
};

export const classes: Class[]= [
    {name: "Druid", domains: [domains[0], domains[1]]},
    {name: "Ranger", domains: [domains[1], domains[2]]},
    {name: "Warrior", domains: [domains[2], domains[3]]},
    {name: "Guardian", domains: [domains[3], domains[4]]},
    {name: "Seraph", domains: [domains[4], domains[5]]},
    {name: "Wizard", domains: [domains[5], domains[6]]},
    {name: "Bard", domains: [domains[6], domains[7]]},
    {name: "Rogue", domains: [domains[7], domains[8]]},
    {name: "Sorcerer", domains: [domains[8], domains[0]]}
];