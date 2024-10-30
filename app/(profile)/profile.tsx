import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '~/lib/supabase';
import { Redirect } from 'expo-router';

const ProfileScreen = () => {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href={'/Auth'} />;
  }
  return (
    <View>
      <Text>{user?.email}</Text>
      <Pressable
        onPress={() => {
          supabase.auth.signOut();
        }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
