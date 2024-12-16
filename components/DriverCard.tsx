import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const Card = ({ item, selected, setSelected }: DriverCardProps) => {
  console.log("Image Url", item?.profile_image_url);
  //   console.log(" Data", item);
  console.log(item);
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.card,
        selected === Number(item.id)
          ? styles.selectedCard
          : styles.unselectedCard,
      ]}
    >
      <Image
        src={item?.profile_image_url}
        // source={{ uri:  }}
        style={styles.profileImage}
      />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.first_name} {item.last_name}
          </Text>

          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.iconSmall} />
            <Text style={styles.ratingText}>4</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.priceContainer}>
            <Image source={icons.dollar} style={styles.iconMedium} />
            <Text style={styles.priceText}>${item.rating}</Text>
          </View>

          <Text style={styles.separator}>|</Text>

          {/* <Text style={styles.detailText}>{formatTime(item.!)}</Text> */}

          <Text style={styles.separator}>|</Text>

          <Text style={styles.detailText}>{item.car_seats} seats</Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={styles.carImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  selectedCard: {
    backgroundColor: "#E6F3FF", // Replace with your Tailwind color equivalent
  },
  unselectedCard: {
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  iconSmall: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMedium: {
    width: 16,
    height: 16,
  },
  priceText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    color: "#475569", // Replace with your Tailwind color equivalent
    marginHorizontal: 4,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    color: "#475569",
  },
  carImage: {
    width: 56,
    height: 56,
  },
});

export default Card;
