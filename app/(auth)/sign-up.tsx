import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";
import { createUser } from "@/api/api";
import { useFetchData } from "@/api/useFetchData";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true); // Start loading
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("error", err?.errors?.[0]?.message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true); // Start loading

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // Check if verification is successful
      if (completeSignUp.status === "complete") {
        // Create the user in your system
        console.log("verification complete...");
        const userData = {
          name: form.name,
          email: form.email,
          clerkId: completeSignUp.createdUserId!,
        };

        await useFetchData(createUser, userData, [
          form.email,
          form.name,
          form.password,
        ]);

        // Set the session
        await setActive({ session: completeSignUp.createdSessionId });

        // Set success state
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err[0]?.errors?.longMessage || "An error occurred",
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="h-[250px] w-full relative">
          <Image source={images.signUpCar} className="w-full h-full" />
          <Text className="absolute bottom-5 left-5 text-2xl text-black font-JakartaSemiBold">
            Create Your Account
          </Text>
        </View>
        <View className="p-3 px-4">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            className="mt-10"
            onPress={onSignUpPress}
          />

          {/* Show loading spinner if loading state is true */}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {/* OAuth -- third party logins */}
          <OAuth />
          <Text className="text-center mt-10 text-general-200">
            Already have an account?{" "}
            <Link
              href={"/(auth)/sign-in"}
              className="text-primary-500 font-bold"
            >
              Log In
            </Link>
          </Text>
        </View>
        {/* Verification modal */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onBackdropPress={() =>
            setVerification({ ...verification, state: "default" })
          }
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        {/* Success Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] my-5 mx-auto"
            />
            <Text className="text-center text-3xl font-JakartaBold">
              Verified
            </Text>
            <Text className="text-center text-base font-gray-400 font-Jakarta mt-2 mb-5">
              You have successfully verified your account
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.replace({
                  pathname: "/(root)/(tabs)",
                });
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
