import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Go Back">
      <View className="my-3">
        <Text className="font-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          textInputBackgroundColor="#f5f5f5"
          containerStyle="bg-neutral-100"
          handlePress={(location) => {
            setUserLocation(location);
          }}
        />
      </View>
      <View className="my-3">
        <Text className="font-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          textInputBackgroundColor="#f5f5f5"
          containerStyle="bg-neutral-100"
          handlePress={(location) => {
            setDestinationLocation(location);
          }}
        />
      </View>
      <CustomButton
        className="mt-5"
        title="Find Now"
        onPress={() => {
          router.push({
            pathname: "/(root)/confirm-ride",
          });
        }}
      />
    </RideLayout>
  );
};

export default FindRide;
