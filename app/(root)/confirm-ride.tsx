import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";
import { getDrivers } from "@/api/api";
import { useFetchData } from "@/api/useFetchData";
// import { drivers } from "@/components/Map";
const ConfirmRide = () => {
  const {
    data: driversData,
    loading,
    error,
    refetch,
  } = useFetchData(getDrivers, {}, []);
  const { selectedDriver, setSelectedDriver, setDrivers, drivers } =
    useDriverStore();

  useEffect(() => {
    if (driversData) {
      console.log("got the data", driversData);
      setDrivers(driversData);
    }
  }, [driversData]);

  return (
    <RideLayout title="Choose a Driver">
      {loading && <ActivityIndicator size={"large"} />}
      {drivers && (
        <FlatList
          data={drivers}
          renderItem={({ item }) => {
            return (
              <DriverCard
                item={item}
                selected={selectedDriver}
                setSelected={() => {
                  console.log("triggerd");
                  console.log(item.id);
                  setSelectedDriver(item.id);
                }}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <View className="mx-5 m-5">
                <CustomButton
                  title="Select Ride"
                  onPress={() => {
                    router.push("/(root)/book-ride");
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </RideLayout>
  );
};

export default ConfirmRide;

const styles = StyleSheet.create({});
