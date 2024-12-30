import { redirect } from "next/navigation";

import Navbar from "@/components/ui/Navbar";
import { getUserFromSession } from "@/lib/auth";
import { getOrganizerName } from "@/lib/db/organizer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromSession();

  if (!user) {
    redirect('/login');
  }

  const organizerName = await getOrganizerName(user.organizerId);

  if (!organizerName) {
    throw new Error("No se pudo obtener el nombre del organizador");
  }

  return (
    <div>
      <Navbar organizerName={organizerName} />
      <main>{children}</main>
    </div>
  );
}
