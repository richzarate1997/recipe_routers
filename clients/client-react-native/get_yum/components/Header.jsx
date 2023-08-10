import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

function Header() {
  return (
    <SafeAreaView>
    <View style={styles.header}>
      <TouchableOpacity style={styles.leftIcon} onPress={() => console.log('Menu clicked')}>
        <Icon name="menu" size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon} onPress={() => console.log('Profile clicked')}>
        <Icon name="food" size={30} />  
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    height: 60, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftIcon: {
    position: 'absolute', 
    top: 10, 
    left: 10,
  },
  rightIcon: {
    position: 'absolute', 
    top: 10, 
    right: 10,
  },
});

export default Header;
