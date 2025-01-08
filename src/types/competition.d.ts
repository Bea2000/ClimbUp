import { Competition, Organizer } from "@prisma/client";

export type CompetitionData = {
    name: string;
    location: string;
    date: Date;
    duration: number;
    code: string;
    organizerId: number;
}

export type CompetitionWithOrganizer = Competition & { organizer: Organizer }; 
