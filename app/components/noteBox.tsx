import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { APIData } from '../datatype/apidata';
import { router } from 'expo-router';

const NoteBox = ({ id, body, title, created_at }: APIData) => {
  const trimTitle = (title: string) => (title.length > 20 ? title.slice(0, 20) + '...' : title);
  const trimBody = (body: string) => (body.length > 50 ? body.slice(0, 50) + '...' : body);

  return (
    <Pressable
      onPress={() => router.push(`/(notes)/${id}`)}
      className="w-full rounded-lg bg-zinc-800 p-4 shadow-md">
      <View className="mb-2">
        <Text className="text-lg font-semibold text-white">{trimTitle(title)}</Text>
      </View>
      <View className="mb-4">
        <Text className="text-sm text-zinc-400">{trimBody(body)}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="rounded-md border border-zinc-500 px-3 py-1 text-xs text-zinc-400">
          Note
        </Text>
        <Text className="text-xs text-zinc-400">{new Date(created_at).toLocaleDateString()}</Text>
      </View>
    </Pressable>
  );
};

export default NoteBox;
