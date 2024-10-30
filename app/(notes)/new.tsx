import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Redirect, router, Stack } from 'expo-router';
import { supabase } from '~/lib/supabase';
import { useAuth } from '../providers/AuthProvider';
import { Snackbar } from 'react-native-paper';

const CreateNote = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={'/(auth)/Auth'} />;
  }

  const handleSubmit = async () => {
    // Validation check for empty inputs
    if (!inputTitle.trim() || !inputBody.trim()) {
      setSnackbarMessage('Title and body cannot be empty');
      setSnackbarVisible(true);
      return; // Prevent further execution if validation fails
    }

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title: inputTitle, body: inputBody, user_id: user.id }])
        .select();

      if (error) {
        console.log(error);
        setSnackbarMessage('Something went wrong');
        setSnackbarVisible(true);
      } else {
        setSnackbarMessage('Note created successfully!');
        setSnackbarVisible(true);
        setInputTitle('');
        setInputBody('');
        router.push('/');
      }
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
            className="border-2 px-4"
          />
        </View>
        <View className="my-4">
          <Text>Body</Text>
          <TextInput
            value={inputBody}
            onChangeText={(text) => setInputBody(text)}
            placeholder="Body"
            className="h-28 border-2 px-4"
          />
        </View>
      </View>
      <View className="px-24">
        <Button onPress={handleSubmit} title="Create" />
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}>
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

export default CreateNote;
