import * as LocalAuthentication from 'expo-local-authentication';

export type BiometricType = 'fingerprint' | 'facial' | 'iris' | 'none';

export async function hasHardwareAsync(): Promise<boolean> {
  return LocalAuthentication.hasHardwareAsync();
}

export async function isEnrolledAsync(): Promise<boolean> {
  return LocalAuthentication.isEnrolledAsync();
}

export async function getSupportedBiometryTypeAsync(): Promise<BiometricType> {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return 'fingerprint';
  }
  if (
    types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
  ) {
    return 'facial';
  }
  if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return 'iris';
  }
  return 'none';
}

export async function authenticateAsync(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to access your account',
    fallbackLabel: 'Use password instead',
  });

  return result.success;
}

export async function isBiometricAvailable(): Promise<boolean> {
  const [hasHardware, isEnrolled] = await Promise.all([
    hasHardwareAsync(),
    isEnrolledAsync(),
  ]);

  return hasHardware && isEnrolled;
}
