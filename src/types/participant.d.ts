import { Participant, ParticipantCompetition, ParticipantProblem } from "@prisma/client";

export type ParticipantWithCompetitionInformation = Participant & {
  competitionsInformation: ParticipantCompetition;
};

export type ParticipantCompetitionWithProblems = ParticipantCompetition & {
  problems: ParticipantProblem[];
};

export type ParticipantWithCompetitionAndProblems = Participant & {
  competition: ParticipantCompetitionWithProblems;
};
