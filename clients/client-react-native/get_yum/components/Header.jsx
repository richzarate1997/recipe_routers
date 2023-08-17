import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

function Header() {
    
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftIcon} onPress={() => console.log('Menu clicked')}>
          <IconButton icon={() => <Icon name="menu" size={24} />} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightIcon} onPress={() => console.log('Profile clicked')}>
          {/* Add right icon */}
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
    left: 10, // Adjusted position
  },
  rightIcon: {
    position: 'absolute',
    top: 10,
    right: 10, // Adjusted position
  },
});

export default Header;
