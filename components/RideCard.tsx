import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/type";
import { icons, images } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";


const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-2 p-2">
      <View className="flex flex-col p-3 justify-between flex-1">
        <View
          style={{ flex: 1 }}
          className="flex flex-row items-center bg-black "
        >
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={{
              width: 80,
              height: 90,
              borderRadius: 10,
            }}
            className="w-[80px] -[90px] rounded-lg"
          />
          <View
            style={{ display: "flex", rowGap: 20, marginHorizontal: 20 }}
            // className="flex flex-col bg-success-400 items-center flex-1"
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                columnGap: 8,
              }}
              className="flex flex-row items-center "
            >
              <Image source={icons.to} style={{ width: 20, height: 20 }} />
              <Text>{ride.origin_address}</Text>
            </View>
            <View
              style={{ display: "flex", columnGap: 8 }}
              className="flex flex-row items-center"
            >
              <Image source={icons.point} style={{ width: 20, height: 20 }} />
              <Text>{ride.destination_address}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver.car_seats}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaBold ${
                ride.payment_status === "paid"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
              style={{
                color: ride.payment_status === "paid" ? "#22c55e" : "#ef4444",
              }}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
      {/* <Text>{ride?.driver.first_name}</Text> */}
    </View>
  );
};

export default RideCard;

const styles = StyleSheet.create({});
