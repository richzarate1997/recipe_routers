import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { SafeAreaView } from 'react-native-safe-area-context';

function Header() {
  return (
    <SafeAreaView>
    <View style={styles.header}>
      <TouchableOpacity style={styles.leftIcon} onPress={() => console.log('Menu clicked')}>
        {/* <LunchDiningOutlinedIcon /> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon} onPress={() => console.log('Profile clicked')}>
        {/* <LunchDiningOutlinedIcon  />   */}
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
    left: 150,
  },
  rightIcon: {
    position: 'absolute', 
    top: 10, 
    right: 150,
  },
});

export default Header;
