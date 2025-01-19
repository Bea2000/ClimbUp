import { Competition, Organizer, Problem, User } from "@prisma/client";

export type CompetitionData = {
    name: string;
    location: string;
    date: Date;
    duration: number;
    code: string;
    organizerId: number;
}

export type CompetitionWithOrganizer = Competition & { organizer: Organizer }; 

export type CompetitionWithOrganizerProblemsParticipantsAndJudges = Competition & {
    organizer: Organizer;
    problems: Problem[];
    participants: { user: User }[];
    judges: { user: User }[];
};
