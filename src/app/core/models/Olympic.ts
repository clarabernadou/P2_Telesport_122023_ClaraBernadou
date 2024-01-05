// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { Participation } from "./Participation";

interface OlympicCountry {
    id: number;
    country: string;
    participations: Participation[];
}

export class Olympic implements OlympicCountry {
    id: number;
    country: string;
    participations: Participation[];

    constructor(id: number, country: string, participations: Participation[]) {
        this.id = id;
        this.country = country;
        this.participations = participations;
    }
}