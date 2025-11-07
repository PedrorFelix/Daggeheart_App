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

export interface Ancestry {
    _id: string;
    name: string;
    description: string;
    Features : [main: feature, secondary: feature];
}

export interface AncestryResponse {
    ancestry: Ancestry;
}

export interface Community {
    _id: string;
    name: string;
    description: string;
    feature : feature;
}

export interface CommunityResponse {
    community: Community;
}

export interface Heritage {
    ancestry: Ancestry;
    community: Community;
}