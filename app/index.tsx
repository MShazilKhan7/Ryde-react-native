import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const Home = () => {
  return <Redirect href="../(auth)/welcome" />;
};

export default Home;

const styles = StyleSheet.create({});
