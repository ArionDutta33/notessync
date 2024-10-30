import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { supabase } from '~/lib/supabase';
import { useAuth } from '../providers/AuthProvider';

const CreateNote = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');
  const { user } = useAuth();
  if (user) {
    console.log(user);
  }

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title: inputTitle, body: inputBody }])
        .select();
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Create Note' }} />
      <View className="my-4 px-4" py-6>
        <View>
          <Text>Title</Text>
          <TextInput
            value={inputTitle}
            onChangeText={(text) => setInputTitle(text)}
            placeholder="Title"
            className=" border-2 px-4"
          />
        </View>
        <View className="my-4">
          <Text>Body</Text>
          <TextInput
            value={inputBody}
            onChangeText={(text) => setInputBody(text)}
            placeholder="Title"
            className=" h-28 border-2 px-4"
          />
        </View>
      </View>
      <View className="px-24">
        <Button onPress={handleSubmit} title="Create" />
      </View>
    </>
  );
};

export default CreateNote;
