import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

const CustomButton = () => {
  return (
    <Pressable className="absolute bottom-3 left-32   w-[40%] flex-row items-center justify-between rounded-lg bg-blue-500 px-4 py-2">
      <AntDesign name="camerao" size={24} color="white" />
      <AntDesign
        onPress={() => {
          console.log('checklog');
          router.push('/(notes)/new');
        }}
        name="plus"
        size={24}
        color="white"
      />
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
