import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bouton from '../components/Bouton';
import useThemeStyles from '../hooks/useColorScheme'; 

type Task = {
  text: string;
};

type Props = {
  navigation: any;
};

export default function TaskListScreen({ navigation }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const styles = useThemeStyles(); 

  const loadTasks = useCallback(async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const deleteTask = async (index: number) => {
    Alert.alert(
      'Supprimer la tâche',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              const newTasks = tasks.filter((_, i) => i !== index);
              setTasks(newTasks);
              await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
            } catch (error) {
              console.error('Failed to delete task', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, index }: { item: Task; index: number }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.text}</Text>
      <Bouton
        text="Modifier"
        iconName="edit"
        onPress={() =>
          navigation.navigate('AddTask', { task: item, index, reloadTasks: loadTasks })
        }
        style={styles.editButton}
      />
      <Bouton
        text="Supprimer"
        iconName="trash"
        onPress={() => deleteTask(index)}
        style={styles.deleteButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Bouton
        iconName="plus"
        text="Ajouter une Tâche"
        onPress={() => navigation.navigate('AddTask', { reloadTasks: loadTasks })}
        style={styles.addButton}
      />
    </View>
  );
}
