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

export interface Feature {
    name: string;
    description: string;
}

export interface Ancestry {
    _id: string;
    name: string;
    description: string;
    Features : [main: Feature, secondary: Feature];
}

export interface AncestryResponse {
    ancestry: Ancestry;
}

export interface Community {
    _id: string;
    name: string;
    description: string;
    feature : Feature;
}

export interface CommunityResponse {
    community: Community;
}

export interface Hybrid {
    ancestries: [Ancestry, Ancestry];
}

export interface Heritage {
    ancestry: Ancestry | Hybrid;
    community: Community;
}

export interface InventoryItem {
    quantity: number;
    item: string;
}

export interface Class {
    _id: string;
    name: string;
    description: string;
    domains : [string, string];
    evasion: number;
    hp: number;
    hopeFeature: [Feature];
    classFeature: [Feature] | [Feature, Feature] | [Feature, Feature, Feature];
    subclasses: [string, string];
    questions: [string, string, string];
    connections: [string, string, string];
    classItem: [string, string];
}

export interface ClassResponse {
    class: Class;
}

export interface Subclass {
    _id: string;
    name: string;
    class: string;
    description: string;
    spellcastTrait?: string;
    foundationFeature: [Feature] | [Feature, Feature];
    specializationFeature: [Feature] | [Feature, Feature];
    masteryFeature: [Feature] | [Feature, Feature];
}

export interface SubclassResponse{
    subclass: Subclass;
}

export interface Character {
    name: string;
    classInfo: { className: string; subclassIndex: 0 | 1 };
    heritage: Heritage;
    level: number;
    traits: [number, number, number, number, number, number];
    inventory: InventoryItem[];
}