import React, { useState } from 'react';
import { View, TextInput, Button, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useThemeStyles from '../hooks/useColorScheme';

type Task = {
  text: string;
};

type Props = {
  route: any;
  navigation: any;
};

export default function AddTaskScreen({ route, navigation }: Props) {
  const { task, index, reloadTasks } = route.params || {};
  const [text, setText] = useState<string>(task ? task.text : '');
  const styles = useThemeStyles();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

  const saveTask = async () => {
    if (text.trim() === '') {
      Alert.alert('Erreur', 'La tâche ne peut pas être vide');
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

      const newTask: Task = { text };
      if (index !== undefined) {
        tasks[index] = newTask;
      } else {
        tasks.push(newTask);
      }

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      if (reloadTasks) {
        reloadTasks();
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Entrez une tâche"
        placeholderTextColor={placeholderColor}
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Enregistrer" onPress={saveTask} />
    </View>
  );
}
