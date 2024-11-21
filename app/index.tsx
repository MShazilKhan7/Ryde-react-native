import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }
  return <Redirect href="../(auth)/welcome" />;
};

export default Home;

const styles = StyleSheet.create({});
