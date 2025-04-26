import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { ArrowLeft } from '@/components/ui/icons/arrow-left';

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleBack}>
      <View className="rounded-full bg-neutral-800 p-4">
        <ArrowLeft size={12} color="white" />
      </View>
    </TouchableWithoutFeedback>
  );
};
