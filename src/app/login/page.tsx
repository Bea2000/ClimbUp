import Image from 'next/image';

import { LoginForm } from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image src="/logo.png" alt="Login" width={100} height={100} className='invert'/>
      <LoginForm />
    </div>
  );
}
