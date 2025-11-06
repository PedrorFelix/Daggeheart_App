export interface Domain {
    _id: string;
    title: string;
    description: string;
}

export interface DomainCard {
    _id: string;
    title: string;
    level: number;
    type: 'Spell' | 'Ability' | 'Grimoire';
    recall_cost: number;
    description: string;
}

export interface DomainResponse {
    domain: Domain;
    cards: DomainCard[];
}

export interface feature {
    name: string;
    description: string;
}

export interface Species {
    _id: string;
    name: string;
    description: string;
    Features : [main: feature, secondary: feature];
}

export interface SpeciesResponse {
    species: Species;
}
//Add more types has more features come online