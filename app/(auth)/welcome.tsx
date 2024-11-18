import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onBoarding } from "@/constants";
import CustomButton from "@/components/CustomButton";
// welcome three steps on boarding screen
const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onBoarding.length - 1;

  return (
    <SafeAreaView className="flex items-center justify-between h-full bg-white pb-10">
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(auth)/sign-up",
          });
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-medium text-black font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"></View>
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"></View>
        }
        onIndexChanged={(index) => {
          console.log("hello", index);
          setActiveIndex(index);
        }}
      >
        {onBoarding.map((item) => (
          <View key={item.id} className="flex justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center mt-10">
              <Text className="text-3xl text-center text-black mx-10 font-JakartaBold">
                {item.title}
              </Text>
            </View>
            <Text className="font-JakartaSemiBold text-[#858585] mt-3 text-lg mx-10 text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        className="w-9/12 p-2 mt-6"
        title={isLastSlide ? "Get Started" : "Next"}
        textVariant="default"
        onPress={() => {
          isLastSlide
            ? router.replace({
                pathname: "/(auth)/sign-up",
              })
            : swiperRef.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
