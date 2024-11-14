import { useState } from "react";
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
import FlashMessage, { showMessage } from "react-native-flash-message";
import { navigate } from "../../contexts/NavigationContext";

export default function ButtonAddVideo() {
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
    UploadVideo(video.assets[0])
      .then(() => {
        setIsLoading(false);
        showMessage({
          message: "Video postado com sucesso",
          type: "success"
        });
        navigate("Main");
      })
      .catch(() => {
        showMessage({
          message: "Algo deu errado, tente novamente mais tarde!",
          type: "danger"
        });
      });
    setIsLoading(false);
  }
  function RemoveVideo() {
    setVideo(null);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        className="w-7/12 h-10 self-center rounded bg-blue-600 items-center justify-center mt-10 mb-5"
        onPress={pickImage}
      >
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
          <TouchableOpacity
            className="w-7/12 h-10 self-center rounded bg-blue-600 items-center justify-center mt-10 mb-10"
            onPress={handleUploadVideo}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={{ color: "#FFF" }}>Enviar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={RemoveVideo}>
            <Text>
              <FontAwesome name="remove" size={24} color="#FFF" />
            </Text>
          </TouchableOpacity>
        </>
      )}
      <FlashMessage position="top" />
    </View>
  );
}
