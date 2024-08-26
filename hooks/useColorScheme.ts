// styles/theme.ts
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

const useThemeStyles = () => {
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
    },

    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    text: {
        color: isDarkMode ? '#000000' : '#FFFFFF',
        fontSize: 16,
    },

    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
      padding: 10,
      borderRadius: 5,
    },
    taskText: {
      flex: 1,
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    editButton: {
      marginRight: 10,
      backgroundColor: isDarkMode ? '#4056F4' : '#470FF4',
    },
    deleteButton: {
      backgroundColor: isDarkMode ? '#FF5555' : '#FF0000',
    },
    addButton: {
      marginTop: 20,
      backgroundColor: isDarkMode ? '#6666FF' : '#6200EE',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444444' : '#CCCCCC',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      backgroundColor: isDarkMode ? '#222222' : '#FFFFFF',
    },

  });
};

export default useThemeStyles;
