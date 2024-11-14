import { ResizeMode, Video } from "expo-av";
import { Text, View } from "react-native";
import { styles } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { api } from "../../infra/axios";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function MyVideoComponent({ data, getVideos }: any) {
  const handleDeleteVideo = async () => {
    const result = await api
      .delete(`/post/${data.id}`)
      .then((response) => {
        showMessage({
          message: "Deletado com sucesso",
          type: "success"
        });
        getVideos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.card}>
      <Video
        style={styles.video}
        source={{
          uri: `${process.env.EXPO_PUBLIC_API}/upload/getVideo/${data.videoUrl}`
        }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={false}
        isMuted={true}
      />
      <Text style={styles.title}>{data.name}</Text>
      <TouchableOpacity onPress={handleDeleteVideo}>
        <Text style={{ textAlign: "center" }}>
          <MaterialIcons name="delete-forever" size={28} color="red" />
        </Text>
      </TouchableOpacity>
      <FlashMessage position="top" />
    </View>
  );
}
