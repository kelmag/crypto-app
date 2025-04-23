import { useRouter } from 'expo-router';
import React from 'react';

import { BiometricAuth } from '@/components/biometric-auth';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const handleAuthenticate = () => {
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <BiometricAuth onAuthenticate={handleAuthenticate} />
    </>
  );
}
