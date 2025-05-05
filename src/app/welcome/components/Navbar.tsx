'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <button className="flex items-center" onClick={() => router.push("/dashboard")}>
          <Image 
            src="/images/logo.svg" 
            alt="ClimbUp Logo" 
            width={40}
            height={40} 
            className="mr-2 invert"
          />
          <span className="text-xl font-bold">ClimbUp</span>
        </button>
      </div>
    </div>
  );
}
