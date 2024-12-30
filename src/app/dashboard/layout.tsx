import { redirect } from "next/navigation";

import Navbar from "@/components/ui/Navbar";
import { getUserFromSession } from "@/lib/auth";
import { getOrganizerName } from "@/lib/db/organizer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromSession();

  if (!user) {
    redirect('/login');
  }

  const orgName = await getOrganizerName(user.organizerId);

  return (
    <div>
      <Navbar orgName={orgName ?? 'Sin nombre'} />
      <main>{children}</main>
    </div>
  );
}
