import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 4,
              marginLeft: 4,
              fontWeight: "400",
            }}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row rounded-full justify-start items-center relative border border-neutral-100 focus:border-primary-500`}
            style={{ borderWidth: 1 }}
          >
            {icon && (
              <Image
                source={icon}
                className="ml-4"
                style={{ width: 30, height: 30, marginLeft: 4 }}
              />
            )}
            <TextInput
              className={`rounded-full p-4 focus:bg-black font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              style={{}}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
