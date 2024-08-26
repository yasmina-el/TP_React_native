import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import useThemeStyles from '../hooks/useColorScheme';

type Props = {
  onPress: () => void;
  text?: string;
  iconName?: any
  style?: any;
};

export default function Bouton({ onPress, text, iconName, style }: Props) {
  const styles = useThemeStyles();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {iconName ? (
        <FontAwesome name={iconName} size={24} color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
