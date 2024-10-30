import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { APIData } from '../datatype/apidata';
import { router } from 'expo-router';

const NoteBox = ({ id, body, title, created_at }: APIData) => {
  const trimTitle = (title: string) => {
    if (title.length > 20) {
      return title.slice(0, 20) + '...';
    }
    return title;
  };
  const trimBody = (body: string) => {
    if (body.length > 50) {
      return body.slice(0, 50) + '...';
    }
    return body;
  };
  return (
    <Pressable
      onPress={() => {
        router.push(`/(notes)/${id}`);
      }}
      className="  w-[50%] rounded-lg  bg-zinc-500 px-4 py-3">
      <View className="">
        <Text className="text-lg font-semibold text-white">{trimTitle(title)}</Text>
      </View>
      <View className="mt-4">
        <Text className="text-xs text-zinc-400">{trimBody(body)}</Text>
      </View>
      <View className="mt-4 flex-row justify-between  ">
        <Text className="border-2 border-zinc-500 px-4 text-zinc-400 ">Note</Text>
        <Text>15 Aug</Text>
      </View>
    </Pressable>
  );
};

export default NoteBox;
