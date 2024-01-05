// TODO: create here a typescript interface for a participation
/*
example of participation:
{
    id: 1,
    year: 2012,
    city: "Londres",
    medalsCount: 28,
    athleteCount: 372
}
*/

export interface Participation {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}

export class Participation implements Participation {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;

    constructor(id: number, year: number, city: string, medalsCount: number, athleteCount: number) {
        this.id = id;
        this.year = year;
        this.city = city;
        this.medalsCount = medalsCount;
        this.athleteCount = athleteCount;
    }
}