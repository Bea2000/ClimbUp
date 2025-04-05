import { Participant, ParticipantCompetition } from "@prisma/client";

export type ParticipantWithInformation = Participant & {
  competitionsInformation: ParticipantCompetition;
};
