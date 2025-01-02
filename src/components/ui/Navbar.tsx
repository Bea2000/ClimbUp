'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import bellIcon from "@/assets/icons/bell.svg";
import hamburgerIcon from "@/assets/icons/hamburger.svg";
import logoutIcon from "@/assets/icons/logOut.svg";

interface NavbarProps {
  organizerName: string;
  superAdmin: boolean;
}

export default function Navbar({ organizerName, superAdmin }: NavbarProps) {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <div className="dropdown">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn btn-ghost"
          >
            <Image src={hamburgerIcon} alt="Menu" width={24} height={24} className="invert" />
          </button>
          {isOpen && (
            <ul className="menu dropdown-content z-50 mt-3 w-64 rounded-box bg-base-200 p-2 shadow">
              <li><Link href="/dashboard/competitions/create" onClick={() => setIsOpen(false)}>Crear Competencia</Link></li>
              {isOpen && superAdmin && (
                <li><Link href="/dashboard/admin/manage" onClick={() => setIsOpen(false)}>Gestionar Administradores</Link></li>
              )}
            </ul>
          )}
        </div>
        <button className="flex items-center" onClick={() => router.push("/dashboard")}>
          <Image 
            src="/logo.svg" 
            alt="ClimbApp Logo" 
            width={40}
            height={40} 
            className="mr-2 invert"
          />
          <span className="text-xl font-bold">{organizerName}</span>
        </button>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-circle btn-ghost">
          <div className="indicator">
            <Image src={bellIcon} alt="Bell" width={24} height={24} className="invert" />
          </div>
        </button>
        <button onClick={() => signOut()} className="btn btn-ghost">
          <Image 
            src={logoutIcon} 
            alt="Logout" 
            width={24}
            height={24} 
            className="mr-2 invert"
          />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
