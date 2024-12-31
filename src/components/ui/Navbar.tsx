'use client';

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import bellIcon from "@/assets/icons/bell.svg";
import logoutIcon from "@/assets/icons/logOut.svg";

interface NavbarProps {
  organizerName: string;
}

export default function Navbar({ organizerName }: NavbarProps) {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost">
          <Image 
            src="/logo.png" 
            alt="Climb Logo" 
            width={40}
            height={40} 
            className="mr-2 invert"
          />
          <span className="text-xl font-bold">{organizerName}</span>
        </Link>
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
