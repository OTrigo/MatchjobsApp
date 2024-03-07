import React, { useRef, useState, useEffect } from "react";
import { Pressable, View, Text, TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface FeedItemProps {
  data: any;
  currentVisibleitem: any;
}

export function FeedItem({ data, currentVisibleitem }: FeedItemProps) {
  const [status, setStatus] = useState<any>({});
  const video = useRef<Video>(null);
  const resizeValue = "contain" as ResizeMode;

  useEffect(() => {
    if (currentVisibleitem?.id === data?.id) {
      video?.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
  }, []);

  function handlePlayer() {
    status?.isPlaying
      ? video?.current?.pauseAsync()
      : video?.current?.playAsync();
  }

  return (
    <Pressable onPress={handlePlayer} style={styles.container}>
      <View style={[styles.info, { bottom: 110 }]}>
        <Text style={styles.name}>{data?.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {data?.description}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart" size={35} color="#fff" />
          <Text style={styles.actionText}>30.3K</Text>
        </TouchableOpacity>
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
        source={{ uri: data?.video }}
        resizeMode={resizeValue}
        shouldPlay={false}
        isMuted={false}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(status)}
      />
    </Pressable>
  );
}
