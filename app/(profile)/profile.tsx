import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '../providers/AuthProvider';

const ProfileScreen = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>{user?.email}</Text>
    </View>
  );
};

export default ProfileScreen;
