import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, router, Stack } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

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
        if (error) throw error; // Handle error from Supabase
        setData(notes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Always turn off loading
      }
    };
    getNotes();
  }, []); // Empty dependency array ensures this runs only on mount

  // Redirect to Auth if no user
  // if (!user) {
  //   return <Redirect href="/Auth" />;
  // }

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
        <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 border-2">
          <View className="flex-wrap gap-2 p-4">
            {data.map((item) => (
              <NoteBox
                key={item.id} // Add a key for each note
                created_at={item.created_at}
                id={item.id}
                title={item.title}
                body={item.body}
              />
            ))}
          </View>
        </ScrollView>
        <CustomButton />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
