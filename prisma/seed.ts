import { PrismaClient, CompetitionStatus, ClimbingGrade, ParticipantStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// Helper function to create problems for a competition
async function createProblemsForCompetition(competitionId: number, gradeType: ClimbingGrade) {
  const problemsData = [];
  
  // Create different problem sets based on grade type
  if (gradeType === ClimbingGrade.V) {
    // V-scale problems (bouldering)
    for (let i = 1; i <= 8; i++) {
      problemsData.push({
        level: `V${i}`,
        name: `Boulder Problem ${i}`,
        maxPoints: 50 + (i * 25),
        attempts: 5,
        discountPerAttempt: 5 + (i * 2),
        competitionId,
      });
    }
  } else if (gradeType === ClimbingGrade.FRENCH) {
    // French grade problems (sport climbing)
    const frenchGrades = ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+', '7b', '7b+'];
    for (let i = 0; i < frenchGrades.length; i++) {
      problemsData.push({
        level: frenchGrades[i],
        name: `Route ${i + 1}`,
        maxPoints: 100 + (i * 20),
        attempts: 3,
        discountPerAttempt: 10 + (i * 3),
        competitionId,
      });
    }
  } else if (gradeType === ClimbingGrade.YOSEMITE) {
    // Yosemite Decimal System (trad climbing)
    const ydsGrades = ['5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b'];
    for (let i = 0; i < ydsGrades.length; i++) {
      problemsData.push({
        level: ydsGrades[i],
        name: `Trad Route ${i + 1}`,
        maxPoints: 120 + (i * 25),
        attempts: 2,
        discountPerAttempt: 20 + (i * 5),
        competitionId,
      });
    }
  }
  
  return await Promise.all(problemsData.map(data => prisma.problem.create({ data })));
}

async function main() {
  // Starting seeding process
  console.log('Starting database seeding...');

  // Clean up existing data
  console.log('Cleaning up existing data...');
  await prisma.participantProblem.deleteMany();
  await prisma.participantCompetition.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.judge.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.organizer.deleteMany();
  
  // Create multiple organizers
  console.log('Creating organizers...');
  const organizers = await Promise.all([
    prisma.organizer.create({
      data: { name: 'ClimbUp Organization' },
    }),
    prisma.organizer.create({
      data: { name: 'Boulder Masters' },
    }),
    prisma.organizer.create({
      data: { name: 'Vertical Limits' },
    }),
  ]);
  
  const [mainOrganizer, boulderOrganizer, verticalOrganizer] = organizers;

  // Create admin users - Note: Admin model now contains user information directly
  console.log('Creating admin users...');
  const admins = await Promise.all([
    prisma.admin.create({
      data: {
        rut: '12345678-9',
        email: 'admin@climbup.com',
        password: await hash('admin123', 10),
        isSuperAdmin: true,
        organizerId: mainOrganizer.id,
      },
    }),
    prisma.admin.create({
      data: {
        rut: '23456789-0',
        email: 'admin@boulder.com',
        password: await hash('admin123', 10),
        isSuperAdmin: false,
        organizerId: boulderOrganizer.id,
      },
    }),
    prisma.admin.create({
      data: {
        rut: '34567890-1',
        email: 'admin@vertical.com',
        password: await hash('admin123', 10),
        isSuperAdmin: false,
        organizerId: verticalOrganizer.id,
      },
    }),
  ]);

  // Create competitions
  console.log('Creating competitions...');
  const competitions = await Promise.all([
    // First competition - Bouldering
    prisma.competition.create({
      data: {
        code: 'COMP2025A',
        name: 'ClimbUp Championship 2025',
        location: 'Santiago, Chile',
        date: new Date('2025-05-15T09:00:00Z'),
        organizerId: mainOrganizer.id,
        duration: 240, // 4 hours
        status: CompetitionStatus.NOT_STARTED,
        levelType: ClimbingGrade.V,
        registerFormSettings: {
          requirePayment: true,
          requireMedicalCertificate: true,
        },
      },
    }),
    // Second competition - Sport Climbing
    prisma.competition.create({
      data: {
        code: 'SPORT2025',
        name: 'Sport Climbing Masters 2025',
        location: 'Valparaíso, Chile',
        date: new Date('2025-06-20T10:00:00Z'),
        organizerId: boulderOrganizer.id,
        duration: 300, // 5 hours
        status: CompetitionStatus.NOT_STARTED,
        levelType: ClimbingGrade.FRENCH,
        registerFormSettings: {
          requirePayment: true,
          requireMedicalCertificate: true,
        },
      },
    }),
    // Third competition - Trad Climbing
    prisma.competition.create({
      data: {
        code: 'TRAD2025',
        name: 'Traditional Climbing Challenge 2025',
        location: 'Concepción, Chile',
        date: new Date('2025-07-10T08:00:00Z'),
        organizerId: verticalOrganizer.id,
        duration: 360, // 6 hours
        status: CompetitionStatus.NOT_STARTED,
        levelType: ClimbingGrade.YOSEMITE,
        registerFormSettings: {
          requirePayment: true,
          requireMedicalCertificate: true,
        },
      },
    }),
    // Fourth competition - In Progress Bouldering
    prisma.competition.create({
      data: {
        code: 'BOULDER24',
        name: 'Boulder Fest 2024',
        location: 'Santiago, Chile',
        date: new Date('2024-12-01T09:00:00Z'),
        organizerId: mainOrganizer.id,
        duration: 180, // 3 hours
        startTime: new Date('2024-12-01T09:00:00Z'),
        status: CompetitionStatus.IN_PROGRESS,
        levelType: ClimbingGrade.V,
        registerFormSettings: {
          requirePayment: false,
          requireMedicalCertificate: true,
        },
      },
    }),
    // Fifth competition - Finished Competition
    prisma.competition.create({
      data: {
        code: 'PAST2024',
        name: 'Past Competition 2024',
        location: 'Viña del Mar, Chile',
        date: new Date('2024-03-15T10:00:00Z'),
        organizerId: boulderOrganizer.id,
        duration: 240, // 4 hours
        startTime: new Date('2024-03-15T10:00:00Z'),
        status: CompetitionStatus.FINISHED,
        levelType: ClimbingGrade.FRENCH,
        registerFormSettings: {
          requirePayment: true,
          requireMedicalCertificate: false,
        },
      },
    }),
  ]);

  const [boulderingComp, sportComp, tradComp, inProgressComp, finishedComp] = competitions;
  
  // Create judges - Note: Judge model now contains email directly
  console.log('Creating judges...');
  const judges = await Promise.all([
    // Judges for first competition
    prisma.judge.create({
      data: {
        email: 'judge1@climbup.com',
        organizerId: mainOrganizer.id,
        competitions: {
          connect: [{ id: boulderingComp.id }],
        },
      },
    }),
    prisma.judge.create({
      data: {
        email: 'judge2@climbup.com',
        organizerId: mainOrganizer.id,
        competitions: {
          connect: [{ id: boulderingComp.id }],
        },
      },
    }),
    // Judges for second competition
    prisma.judge.create({
      data: {
        email: 'judge3@climbup.com',
        organizerId: boulderOrganizer.id,
        competitions: {
          connect: [{ id: sportComp.id }],
        },
      },
    }),
    // Judges for third competition
    prisma.judge.create({
      data: {
        email: 'judge4@climbup.com',
        organizerId: verticalOrganizer.id,
        competitions: {
          connect: [{ id: tradComp.id }],
        },
      },
    }),
    // Judges for in-progress competition
    prisma.judge.create({
      data: {
        email: 'judge5@climbup.com',
        organizerId: mainOrganizer.id,
        competitions: {
          connect: [{ id: inProgressComp.id }],
        },
      },
    }),
  ]);

  // Create problems for each competition using the helper function
  console.log('Creating problems...');
  const boulderingProblems = await createProblemsForCompetition(boulderingComp.id, ClimbingGrade.V);
  const sportProblems = await createProblemsForCompetition(sportComp.id, ClimbingGrade.FRENCH);
  const tradProblems = await createProblemsForCompetition(tradComp.id, ClimbingGrade.YOSEMITE);
  const inProgressProblems = await createProblemsForCompetition(inProgressComp.id, ClimbingGrade.V);
  const finishedProblems = await createProblemsForCompetition(finishedComp.id, ClimbingGrade.FRENCH);

  // Assign problems to judges
  console.log('Assigning problems to judges...');
  await Promise.all([
    // First judge gets half of bouldering problems
    prisma.judge.update({
      where: { id: judges[0].id },
      data: {
        problems: {
          connect: boulderingProblems.slice(0, 4).map(problem => ({ id: problem.id })),
        },
      },
    }),
    // Second judge gets other half of bouldering problems
    prisma.judge.update({
      where: { id: judges[1].id },
      data: {
        problems: {
          connect: boulderingProblems.slice(4).map(problem => ({ id: problem.id })),
        },
      },
    }),
    // Third judge gets sport problems
    prisma.judge.update({
      where: { id: judges[2].id },
      data: {
        problems: {
          connect: sportProblems.map(problem => ({ id: problem.id })),
        },
      },
    }),
    // Fourth judge gets trad problems
    prisma.judge.update({
      where: { id: judges[3].id },
      data: {
        problems: {
          connect: tradProblems.map(problem => ({ id: problem.id })),
        },
      },
    }),
    // Fifth judge gets in-progress problems
    prisma.judge.update({
      where: { id: judges[4].id },
      data: {
        problems: {
          connect: inProgressProblems.map(problem => ({ id: problem.id })),
        },
      },
    }),
  ]);

  // Create participants - Note: Participant model now only has rut
  console.log('Creating participants...');
  const participants = await Promise.all(
    Array.from({ length: 15 }, (_, i) => {
      const num = i + 1;
      const paddedNum = num.toString().padStart(2, '0');
      return prisma.participant.create({
        data: {
          rut: `${paddedNum}${paddedNum}${paddedNum}${paddedNum}${paddedNum}-${num}`,
        },
      });
    }),
  );

  // Create participant-competition relationships with additional information
  console.log('Creating participant-competition relationships...');
  
  // Helper function to distribute participants across competitions
  const createParticipantCompetitions = async (participants: any[], competition: any, status: ParticipantStatus, categoryOptions: string[]) => Promise.all(
    participants.map((participant, index) => prisma.participantCompetition.create({
      data: {
        participant: {
          connect: { id: participant.id },
        },
        competition: {
          connect: { id: competition.id },
        },
        status,
        category: categoryOptions[index % categoryOptions.length],
        userInformation: {
          name: `Participant ${participant.id}`,
          email: `participant${participant.id}@example.com`,
          phone: `+56 9 ${Math.floor(10000000 + Math.random() * 90000000)}`,
          emergencyContactName: `Emergency Contact for ${participant.id}`,
          emergencyContactPhone: `+56 9 ${Math.floor(10000000 + Math.random() * 90000000)}`,
          emergencyContactRelationship: 'Familiar',
        },
      },
    })),
  );

  const maleCategories = ['Masculino Novato', 'Masculino Intermedio', 'Masculino Avanzado'];
  const femaleCategories = ['Femenino Novato', 'Femenino Intermedio', 'Femenino Avanzado'];
  const allCategories = [...maleCategories, ...femaleCategories];

  // Distribute participants across competitions
  const boulderingParticipants = await createParticipantCompetitions(
    participants.slice(0, 5),
    boulderingComp,
    ParticipantStatus.CONFIRMED,
    allCategories,
  );

  const sportParticipants = await createParticipantCompetitions(
    participants.slice(5, 10),
    sportComp,
    ParticipantStatus.CONFIRMED,
    allCategories,
  );

  const tradParticipants = await createParticipantCompetitions(
    participants.slice(10, 15),
    tradComp,
    ParticipantStatus.PENDING,
    allCategories,
  );

  // Add some participants to in-progress competition
  const inProgressParticipants = await createParticipantCompetitions(
    participants.slice(0, 8),
    inProgressComp,
    ParticipantStatus.CONFIRMED,
    allCategories,
  );

  // Add some participants to finished competition
  const finishedParticipants = await createParticipantCompetitions(
    participants.slice(7, 15),
    finishedComp,
    ParticipantStatus.CONFIRMED,
    allCategories,
  );

  // Create participant problem records with random scores for in-progress and finished competitions
  console.log('Creating participant problem records...');
  
  // Helper function to create participant problem records
  const createParticipantProblems = async (participantCompetitions: any[], problems: any[]) => {
    const participantProblems = [];
    
    for (const pc of participantCompetitions) {
      for (const problem of problems) {
        // Random number of attempts between 1 and problem.attempts
        const attempts = Math.floor(Math.random() * problem.attempts) + 1;
        // 70% chance of completing the problem
        const completed = Math.random() < 0.7;
        // Calculate points based on completion and attempts
        const points = completed 
          ? problem.maxPoints - ((attempts - 1) * problem.discountPerAttempt)
          : 0;
          
        participantProblems.push({
          problem: {
            connect: { id: problem.id },
          },
          participant: {
            connect: { id: pc.participantId },
          },
          participantCompetition: {
            connect: { id: pc.id },
          },
          attempts,
          completed,
          points,
        });
      }
    }
    
    return Promise.all(participantProblems.map(data => prisma.participantProblem.create({ data })));
  };

  // Create participant problems for in-progress competition
  await createParticipantProblems(inProgressParticipants, inProgressProblems);
  
  // Create participant problems for finished competition
  const finishedParticipantProblems = await createParticipantProblems(finishedParticipants, finishedProblems);
  
  // Update final scores for finished competition participants
  console.log('Updating final scores for finished competition...');
  
  // Group participant problems by participant competition ID and sum points
  const finalScores = new Map();
  for (const pp of finishedParticipantProblems) {
    const currentScore = finalScores.get(pp.participantCompetitionId) || 0;
    finalScores.set(pp.participantCompetitionId, currentScore + (pp.points || 0));
  }
  
  // Update each participant competition with final score
  await Promise.all(
    Array.from(finalScores.entries()).map(([pcId, score]) => prisma.participantCompetition.update({
      where: { id: Number(pcId) },
      data: { finalScore: score },
    })),
  );

  console.log('Database seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
