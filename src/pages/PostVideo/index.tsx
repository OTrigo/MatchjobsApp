import { View } from "react-native";
import ButtonAddVideo from "../../components/ButtonAddVideo";
import FlashMessage from "react-native-flash-message";

export default function PostVideo({ navigate }: any) {
  return (
    <>
      <View className="flex h-full pt-3 bg-gray-900 w-full">
        <ButtonAddVideo />
        <FlashMessage position="top" />
      </View>
    </>
  );
}
