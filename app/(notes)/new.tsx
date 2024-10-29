import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CreateNote = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Create Note' }} />
      <View className="my-4 px-4" py-6>
        <View>
          <Text>Title</Text>
          <TextInput placeholder="Title" className=" border-2 px-4" />
        </View>
        <View className="my-4">
          <Text>Body</Text>
          <TextInput placeholder="Title" className=" h-28 border-2 px-4" />
        </View>
      </View>
      <View className="px-24">
        <Button title="Create" />
      </View>
    </>
  );
};

export default CreateNote;
