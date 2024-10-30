import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Notes } from '~/types/db';
import { supabase } from '~/lib/supabase';

const NoteDetails = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Notes | null>(null); // Store single note
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch note details on component mount
  useEffect(() => {
    const getPostDetails = async () => {
      setLoading(true);
      try {
        let { data: notes, error } = await supabase
          .from('notes')
          .select('title, body')
          .eq('id', id)
          .single(); // Fetch single note

        if (error) throw error; // Handle error from Supabase
        setData(notes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetails();
  }, [id]); // Run when id changes

  if (loading) return <ActivityIndicator size="large" color="black" />;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Details',
          headerTintColor: 'gray',
          headerStyle: { backgroundColor: 'black' },
          headerShadowVisible: false,
        }}
      />
      <ScrollView className="flex-1 bg-black" showsVerticalScrollIndicator={false}>
        <Text className="px-6 py-6 text-xl font-semibold text-zinc-400">{data?.title}</Text>
        <Text className="textlg px-6 text-sm text-zinc-400">{data?.body}</Text>
      </ScrollView>
    </>
  );
};

export default NoteDetails;
