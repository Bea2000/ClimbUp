import { Participant, ParticipantCompetition } from "@prisma/client";

export type ParticipantWithCompetitionInformation = Participant & {
  competitionsInformation: ParticipantCompetition;
};
