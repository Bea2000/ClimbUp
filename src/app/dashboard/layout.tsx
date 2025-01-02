import { redirect } from "next/navigation";

import Navbar from "@/components/ui/Navbar";
import { getUserFromSession, isSuperAdmin } from "@/lib/auth";
import { getOrganizerName } from "@/lib/db/organizer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromSession();
  const superAdmin = await isSuperAdmin(user);

  if (!user) {
    redirect('/login');
  }

  const organizerName = await getOrganizerName(user.organizerId);

  if (!organizerName) {
    throw new Error("No se pudo obtener el nombre del organizador");
  }

  return (
    <div>
      <Navbar organizerName={organizerName} superAdmin={superAdmin} />
      <main>{children}</main>
    </div>
  );
}
