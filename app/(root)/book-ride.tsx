import { useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, View } from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import Payment from "@/components/Payment";
import { useEffect, useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
// import { drivers as data } from "@/components/Map";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { selectedDriver, drivers } = useDriverStore();

  console.log("drivers from store", drivers);
  console.log("Selected Driver", selectedDriver);
  const driverDetails = drivers?.filter(
    (driver) => driver.id === selectedDriver
  )[0];

  console.log("driver details", driverDetails);

  return (
    <StripeProvider
      publishableKey=""
      // publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <RideLayout title="Book Ride">
        <>
          <Text style={styles.titleText}>Ride Information</Text>

          <View style={styles.centerContent}>
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              style={styles.driverImage}
            />

            <View style={styles.driverInfoContainer}>
              <Text style={styles.driverTitle}>
                {driverDetails?.first_name}
              </Text>

              <View style={styles.ratingContainer}>
                <Image
                  source={icons.star}
                  style={styles.ratingIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>{driverDetails?.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ride Price</Text>
              <Text style={[styles.infoValue, styles.priceValue]}>${4}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pickup Time</Text>
              <Text style={styles.infoValue}>{formatTime(5!)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Car Seats</Text>
              <Text style={styles.infoValue}>{driverDetails?.car_seats}</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View style={[styles.addressRow, styles.addressRowTop]}>
              <Image source={icons.to} style={styles.addressIcon} />
              <Text style={styles.addressText}>{userAddress}</Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.addressIcon} />
              <Text style={styles.addressText}>{destinationAddress}</Text>
            </View>
          </View>
          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id}
            rideTime={driverDetails?.time!}
          />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: "JakartaSemiBold",
    marginBottom: 12,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  driverImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  driverInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  driverTitle: {
    fontSize: 18,
    fontFamily: "JakartaSemiBold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  ratingIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  infoCard: {
    backgroundColor: "#F6F8FA", // Replace "bg-general-600" with your desired color.
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  infoValue: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
  },
  priceValue: {
    color: "#0CC25F",
  },
  addressContainer: {
    marginTop: 20,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1 / 2,
    borderBottomColor: "#505050", // Replace "border-general-700" with your desired color.
  },
  addressRowTop: {
    borderTopWidth: 1 / 2,
    borderTopColor: "#505050", // Replace "border-general-700" with your desired color.
  },
  addressIcon: {
    width: 24,
    height: 24,
  },
  addressText: {
    fontSize: 18,
    fontFamily: "JakartaRegular",
    marginLeft: 8,
  },
});

export default BookRide;
