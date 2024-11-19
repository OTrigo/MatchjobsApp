import { ResizeMode, Video } from "expo-av";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function SearchVideo({
  post,
  setIsFullscreen,
  setIndexVideo,
  currentIndex
}: {
  post: any;
  setIsFullscreen: any;
  setIndexVideo: any;
  currentIndex: number;
}) {
  return (
    <View className="w-3/12 mt-10 ml-4 mr-5">
      <TouchableWithoutFeedback
        onPress={() => {
          setIsFullscreen(true);
          console.log(currentIndex);
          setIndexVideo(currentIndex);
        }}
      >
        <Video
          style={{ maxWidth: "100%", height: 200 }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API}/upload/getVideo/${post.videoUrl}`
          }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={false}
          isMuted={true}
        />
        <Text className="color-white text-center">{post.title}</Text>
      </TouchableWithoutFeedback>
      <FlashMessage position="top" />
    </View>
  );
}
