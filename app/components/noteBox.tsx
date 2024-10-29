import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { APIData } from '../types/apidata';

const NoteBox = ({ body, title }: APIData) => {
  return (
    <Pressable
      onPress={() => {
        console.log('check');
      }}
      className="h-[10%] w-[50%] rounded-3xl bg-zinc-500 px-4 py-3">
      <View className="">
        <Text className="text-lg font-semibold text-white">Change by design</Text>
      </View>
      <View className="mt-4">
        <Text className="text-xs text-zinc-400">{body}</Text>
      </View>
      <View className="mt-4 flex-row justify-between border-2">
        <Text className="border-2 border-zinc-500 px-4 text-zinc-400 ">Tag</Text>
        <Text>15 Aug</Text>
      </View>
    </Pressable>
  );
};

export default NoteBox;
