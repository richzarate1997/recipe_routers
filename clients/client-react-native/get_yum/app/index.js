import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Header from '../components/Header';


export default function Page() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to GetYum</Text>
        <Text style={styles.subtitle}>This is the first page of our app.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
