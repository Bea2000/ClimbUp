import { getAllCompetitionsWithOrganizer } from "@/lib/db/competition";

import CompetitionGrid from "./components/CompetitionGrid";
import HeroSection from "./components/Hero";
import PresentationComponent from "./components/Presentation";

export default async function Home() {
  const competitions = await getAllCompetitionsWithOrganizer()
  
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      
      <section id="competitions" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Próximas Competencias
          </h2>
          
          <CompetitionGrid competitions={competitions} />
        </div>
      </section>

      <PresentationComponent />
      
    </div>
  );
}
