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
    participantIdentifier: string;
}


