import React, { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';

import {
  Button,
  Image,
  SafeAreaView,
  showErrorMessage,
  Text,
  View,
} from '@/components/ui';
import { useAuth } from '@/lib';
import { getSupportedBiometryTypeAsync } from '@/lib/auth/biometric';

type BiometricAuthProps = {
  onAuthenticate: () => void;
};

function BiometricIcon() {
  const [biometryType, setBiometryType] = useState<string>('none');

  useEffect(() => {
    const getBiometryType = async () => {
      const type = await getSupportedBiometryTypeAsync();
      setBiometryType(type);
    };

    getBiometryType();
  }, []);

  let iconSource;
  if (biometryType === 'facial') {
    iconSource = require('@assets/images/face-id.png');
  } else if (biometryType === 'fingerprint' || biometryType === 'iris') {
    iconSource = require('@assets/images/fingerprint.png');
  } else {
    iconSource = require('@assets/images/placeholder.png');
  }

  return (
    <View className=" items-center justify-center shadow-2xl shadow-blue-500 drop-shadow-2xl ">
      <Image
        source={iconSource}
        style={{ width: 240, height: 240 }}
        contentFit="contain"
      />
    </View>
  );
}

export function BiometricAuth({ onAuthenticate }: BiometricAuthProps) {
  const {
    isBiometricAvailable,
    authenticateWithBiometric,
    checkBiometricAvailability,
  } = useAuth();

  useEffect(() => {
    checkBiometricAvailability();
  }, [checkBiometricAvailability]);

  const handleAuth = async () => {
    if (isBiometricAvailable) {
      const success = await authenticateWithBiometric();
      if (success) {
        onAuthenticate();
      }
    } else {
      // Direct user to device settings to set up biometrics
      Alert.alert(
        'Set Up Biometric Authentication',
        'Open settings to set up biometric authentication',
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings().catch(() =>
                showErrorMessage(
                  'Please allow Location sharing through settings of your device'
                )
              );
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-between p-6">
      <View className="">
        <Text className="text-left text-4xl font-light">Use Biometric</Text>
        <Text className="text-left text-4xl font-light">To log in?</Text>
      </View>
      <View className=" flex-1 items-center justify-center shadow-2xl shadow-blue-600 drop-shadow-2xl">
        <BiometricIcon />
      </View>

      <Button
        testID="biometric-button"
        size="lg"
        label={isBiometricAvailable ? 'Login' : 'Set up'}
        onPress={handleAuth}
      />
    </SafeAreaView>
  );
}
