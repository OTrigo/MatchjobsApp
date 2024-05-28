import React, { useRef, useState, useEffect } from "react";
import { Pressable, View, Text, TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { api } from "../../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import MyVideoComponent from "../MyVideoComponent";

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
  const isFocused = useIsFocused();
  const [status, setStatus] = useState<any>({});
  const video = useRef<Video>(null);
  const resizeValue = "contain" as ResizeMode;

  async function sendCV() {
    if (data.jobsId !== null) {
      const result = await api
        .post(`/job/portifolio/${data.jobsId}`, {
          id: parseInt(userData.id),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role
        })
        .then((result) => {
          alert("enviado com sucesso");
        })
        .catch((err) => {
          console.log("erro", err.response);
        });
    }
  }

  useEffect(() => {
    if (currentVisibleitem?.id === data?.id) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
    if (!isFocused) {
      video.current?.pauseAsync();
    }
  }, [currentVisibleitem, isFocused]);

  function handlePlayer() {
    status?.isPlaying
      ? video?.current?.pauseAsync()
      : video?.current?.playAsync();
  }

  return (
    <GestureDetector
      gesture={Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
          console.log(data.id);
        })}
    >
      <Pressable onPress={handlePlayer} style={styles.container}>
        <View style={[styles.info, { bottom: 110 }]}>
          <Text style={styles.name}>{data?.name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {data?.description}
          </Text>
        </View>

        <View style={styles.actions}>
          {data.jobsId && (
            <TouchableOpacity onPress={sendCV} style={styles.actionButton}>
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
            uri: `https://lfrigfcolhycpfxcxnjn.supabase.co/storage/v1/object/public/matchjobsVideos/${data.videoUrl}`
          }}
          resizeMode={resizeValue}
          shouldPlay={false}
          isMuted={false}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(status)}
        />
      </Pressable>
    </GestureDetector>
  );
}
