import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import NoteBox from './components/noteBox';
import { APIData } from './datatype/apidata';
import CustomButton from './components/button';
import { supabase } from '~/lib/supabase';

const HomeScreen = () => {
  const readRows = async () => {
    try {
      let { data: notes, error } = await supabase.from('notes').select('*');
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readRows();
  });

  const data: APIData[] = [
    {
      id: 1,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 2,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 3,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 4,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 5,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 6,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 7,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 8,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 9,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 10,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
    {
      id: 10,
      title: 'Change by design',
      body: 'How we design changes the way we see the world. It enriches the experiences of people around us. Desgn is very humane',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My notesa',
          headerRight: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
      <View className="relative flex-1">
        <View className="  p-6">
          <TextInput
            placeholder="Search notes... "
            className="mx-4 rounded-3xl border-2 p-2 px-8"
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1    border-2 ">
          <View className="flex-wrap  gap-2  p-4 ">
            {data.map((item) => (
              <NoteBox id={item.id} title={item.title} body={item.body} />
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
