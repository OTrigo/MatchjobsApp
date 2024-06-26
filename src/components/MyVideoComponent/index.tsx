import { ResizeMode, Video } from "expo-av";
import { Text, View } from "react-native";
import { styles } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { api } from "../../infra/axios";

export default function MyVideoComponent({ data }: any) {
  const handleDeleteVideo = async () => {
    const result = await api
      .get(`/upload-video/delete/${data.videoUrl}/${data.id}`)
      .then((response) => {
        alert("deletado com sucesso");
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
          uri: `https://lfrigfcolhycpfxcxnjn.supabase.co/storage/v1/object/public/matchjobsVideos/${data?.videoUrl}`
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
    </View>
  );
}
