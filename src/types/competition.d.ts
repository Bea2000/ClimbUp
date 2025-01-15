import { Competition, Organizer, Problem, User, ClimbingGrade } from "@prisma/client";

export type CompetitionData = {
    name: string;
    location: string;
    date: Date;
    duration: number;
    code: string;
    organizerId: number;
    levelType: ClimbingGrade;
}

export type CompetitionWithOrganizer = Competition & { organizer: Organizer }; 

export type CompetitionWithProblemsParticipantsAndJudges = Competition & {
    problems: Problem[];
    participants: { user: User }[];
    judges: { user: User }[];
};
