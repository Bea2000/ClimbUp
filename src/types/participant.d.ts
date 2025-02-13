import { Participant, User } from "@prisma/client";

export type ParticipantWithUser = Participant & { user: User }; 
