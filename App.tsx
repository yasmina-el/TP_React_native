import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Liste de Tâches' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Ajouter une Tâche' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
