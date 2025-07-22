import { Competition, Organizer, Problem, ClimbingGrade, Judge, ParticipantCompetition } from "@prisma/client";

export type CompetitionData = {
    name: string;
    location: string;
    date: Date;
    duration: number;
    code: string;
    organizerId: number;
    levelType: ClimbingGrade;
    categories?: string[];
}

export type CompetitionWithOrganizer = Competition & { organizer: Organizer }; 

export type CompetitionWithProblemsJudgesAndParticipants = Competition & {
    problems: Problem[];
    judges: Judge[];
    participants: ParticipantCompetition[];
};

export type RegisterFormField = {
    type: 'text' | 'number' | 'email' | 'tel' | 'date' | 'time' | 'checkbox' | 'rut' | 'select';
    name: string;
}

export type RegisterFormSettings = {
    title: string;
    description: string;
    price?: string;
    paymentRequired: boolean;
    paymentUrl?: string;
    paymentType?: 'file' | 'url';
    competitionBasesFileUrl?: string;
    fields: RegisterFormField[];
}


