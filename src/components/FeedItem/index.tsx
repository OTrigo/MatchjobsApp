import React, { useRef, useState, useEffect } from "react";
import { Pressable, View, Text, TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { api } from "../../infra/axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";

interface FeedItemProps {
  data: any;
  currentVisibleitem: any;
  userData: any;
}

export function FeedItem({
  data,
  currentVisibleitem,
  userData
}: FeedItemProps) {
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const isFocused = useIsFocused();
  const [status, setStatus] = useState<any>({});
  const video = useRef<Video>(null);
  const resizeValue = "contain" as ResizeMode;

  async function sendCV(id: String) {
    const token = await AsyncStorage.getItem("@matchjobs");
    const config = ` bearer ${token}`;
    if (id !== null) {
      const result = await api
        .post(
          `/job/apply/${id}`,
          {},
          {
            headers: {
              Authorization: config.split('"').join("")
            }
          }
        )
        .then((result) => {
          showMessage({
            message: "enviado com sucesso",
            type: "success"
          });
        })
        .catch((err) => {
          console.log("erro", err.response);
        });
    }
  }

  useEffect(() => {
    if (video.current) {
      if (currentVisibleitem?.id === data?.id && isFocused) {
        video.current.playAsync();
      } else {
        video.current.pauseAsync();
      }
    }
  }, [currentVisibleitem, isFocused]);

  function handlePlayer() {
    if (video.current) {
      status?.isPlaying
        ? video.current.pauseAsync()
        : video.current.playAsync();
    }
  }

  const handleDoubleClick = (id: string) => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastClickTime;
    if (timeDifference < 500 && timeDifference > 0) {
      setClickCount(clickCount + 1);
      sendCV(id);
    } else {
      setLastClickTime(currentTime);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleDoubleClick(data.jobId)}>
      <Pressable onPress={handlePlayer} style={styles.container}>
        <View style={[styles.info, { bottom: 110 }]}>
          <Text style={styles.name}>{data?.name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {data?.description}
          </Text>
        </View>

        <View style={styles.actions}>
          {data.jobId && (
            <TouchableOpacity
              onPress={() => sendCV(data.jobId)}
              style={styles.actionButton}
            >
              <MaterialCommunityIcons name="file-send" size={35} color="#fff" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-ellipses" size={35} color="#fff" />
            <Text style={styles.actionText}>25.3K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark" size={35} color="#fff" />
          </TouchableOpacity>
        </View>

        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API}/upload/getVideo/${data.videoUrl}`
          }}
          resizeMode={resizeValue}
          shouldPlay={false}
          isMuted={false}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(status)}
        />
      </Pressable>
      <FlashMessage position="top" />
    </TouchableWithoutFeedback>
  );
}
