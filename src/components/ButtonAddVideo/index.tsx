import { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { ResizeMode, Video } from "expo-av";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UploadVideo } from "../../contexts/VideoContext";
interface videoProps {
  title: string;
  description: string;
}

export default function ButtonAddVideo({ title, description }: videoProps) {
  const date = new Date();

  const [video, setVideo] = useState<any>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 180,
      allowsMultipleSelection: false
    });

    console.log(result);

    if (!result.canceled) {
      setVideo(result);
    }
  };
  async function handleUploadVideo() {
    const userData: any = await AsyncStorage.getItem("@matchjobs");
    const { id, name } = jwtDecode(userData);
    UploadVideo(
      video.assets[0],
      id + name + date.getHours() + date.getMinutes() + date.getSeconds(),
      title,
      description,
      id.toString()
    );
  }
  function RemoveVideo() {
    setVideo(null);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
          Escolher Video
        </Text>
      </TouchableOpacity>
      {video && (
        <>
          <Video
            isLooping={true}
            shouldPlay={true}
            source={{ uri: video.assets[0].uri }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
          />
          <TouchableOpacity onPress={handleUploadVideo}>
            <Text>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={RemoveVideo} style={styles.button}>
            <Text>Remover video</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
