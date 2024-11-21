import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignUp = async () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View style={{ height: 1, backgroundColor: "#CED1DD", flex: 1 }} />
        <Text className="text-lg p-2 font-semibold">Or</Text>
        <View style={{ height: 1, backgroundColor: "#CED1DD", flex: 1 }} />
      </View>
      <CustomButton
        title="Login With Google"
        bgVariant="primary"
        className="text-black"
        IconLeft={() => {
          return (
            <Image
              source={icons.google}
              resizeMode="contain"
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
          );
          //   return icons.google;
        }}
        onPress={handleGoogleSignUp}
      />
    </View>
  );
};

export default OAuth;

const styles = StyleSheet.create({});
