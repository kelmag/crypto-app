import { Redirect, useRouter } from 'expo-router';
import React from 'react';

import { BiometricAuth } from '@/components/biometric-auth';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const status = useAuth.use.status();

  const signIn = useAuth.use.signIn();

  if (status === 'signIn') {
    return <Redirect href="/" />;
  }

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
