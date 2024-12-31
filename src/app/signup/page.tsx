import Image from 'next/image';

import { SignupForm } from './components/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-8">
      <Image src="/logo.png" alt="Login" width={100} height={100} className='invert'/>
      <div className="mt-8 w-full max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
} 
