import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { TabItem } from '@/components/market/market-tabs';
import { Input, View } from '@/components/ui';
import { SearchIcon } from '@/components/ui/icons';

type SearchHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

export function SearchHeader({ search, setSearch }: SearchHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="">
        <TabItem title="All Coins" isActive={true} onPress={() => {}} />
      </View>
      <KeyboardAvoidingView className="flex-1">
        <Input
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          rightIcon={<SearchIcon size={20} />}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
