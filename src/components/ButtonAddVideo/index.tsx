import React, { SetStateAction, useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { ResizeMode, Video } from "expo-av";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UploadVideo } from "../../contexts/VideoContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
interface videoProps {
  title: string;
  description: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  setDescription: React.Dispatch<SetStateAction<string>>;
}

export default function ButtonAddVideo({
  title,
  description,
  setTitle,
  setDescription
}: videoProps) {
  const date = new Date();

  const [video, setVideo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 180,
      allowsMultipleSelection: false
    });

    if (!result.canceled) {
      setVideo(result);
    }
  };
  async function handleUploadVideo() {
    setIsLoading(true);
    const userData: any = await AsyncStorage.getItem("@matchjobs");
    const { id, name } = jwtDecode(userData);
    UploadVideo(
      video.assets[0],
      id + name + date.getHours() + date.getMinutes() + date.getSeconds(),
      title,
      description,
      id.toString()
    ).then(() => {
      setIsLoading(false);
      setDescription("");
      setTitle("");
      setVideo(null);
    });
    setIsLoading(false);
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
          <TouchableOpacity onPress={handleUploadVideo} style={styles.button}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={{ color: "#FFF" }}>Enviar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={RemoveVideo}>
            <Text>
              <FontAwesome name="remove" size={24} color="#037abe" />
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
