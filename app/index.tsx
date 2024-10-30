import { ActivityIndicator, TextInput, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import NoteBox from './components/noteBox';
import CustomButton from './components/button';
import { supabase } from '~/lib/supabase';
import { useAuth } from './providers/AuthProvider';
import { Notes } from '~/types/db';

const HomeScreen = () => {
  const [data, setData] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Fetch notes on component mount
  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const { data: notes, error } = await supabase.from('notes').select('*');
        if (error) throw error;
        setData(notes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getNotes();
  }, []);

  // Show loading indicator
  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Notes',
          headerRight: () => (
            <AntDesign
              onPress={() => router.push('/(profile)/profile')}
              name="user"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <View className="relative flex-1">
        <View className="p-6">
          <TextInput placeholder="Search notes..." className="mx-4 rounded-3xl border-2 p-2 px-8" />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View className="w-1/2 p-2">
              <NoteBox
                created_at={item.created_at}
                id={item.id}
                title={item.title}
                body={item.body}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Display items in 2 columns
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-red-400"
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
        />
        <CustomButton />
      </View>
    </>
  );
};

export default HomeScreen;
