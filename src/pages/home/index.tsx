import { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { styles } from "./styles";
import { FeedItem } from "../../components/FeedItem";
import { api } from "../../infra/axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { height: heightScreen } = Dimensions.get("screen");

export default function Home() {
  const focused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  async function handleGetVideos() {
    setLoading(true);
    const videos: any = await api.get("post/");
    if (!videos) {
      return;
    }
    setMockedPost(videos.data);
    setLoading(false);
  }
  useEffect(() => {
    async function getUserData() {
      const storage = await AsyncStorage.getItem("@matchjobs");
      const userd = jwtDecode(storage ? storage : "");
      setUser(userd);
    }
    async function getVideos() {
      setLoading(true);
      const videos: any = await api.get("post/");
      if (!videos) {
        return;
      }
      setMockedPost(videos.data);
      setShowItem(mockedPosts[0]);
      setLoading(false);
    }
    getVideos();
    getUserData();
  }, [focused]);
  const [mockedPosts, setMockedPost] = useState([]);
  const [showItem, setShowItem] = useState(mockedPosts[0]);
  const onViewRef = useRef(({ viewableItens }: any) => {
    console.log(viewableItens);
    if (viewableItens && viewableItens.length > 0) {
      setShowItem(mockedPosts[viewableItens[0].index]);
    }
  });

  return !loading && mockedPosts !== null ? (
    <View style={styles.container}>
      <View style={styles.labels}>
        <TouchableOpacity>
          <Text style={[styles.labelText, { color: "#DDD" }]}>Seguindo</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.labelText, { color: "#FFF" }]}>Pra Você</Text>
          <View style={styles.indicator}></View>
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={styles.container}>
        <FlatList
          data={mockedPosts}
          renderItem={({ item }) => (
            <FeedItem
              data={item}
              currentVisibleitem={showItem}
              userData={user}
            />
          )}
          onViewableItemsChanged={onViewRef.current}
          snapToAlignment="center"
          snapToInterval={heightScreen}
          scrollEventThrottle={200}
          decelerationRate={"fast"}
          viewabilityConfig={{
            waitForInteraction: false,
            viewAreaCoveragePercentThreshold: 100
          }}
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#037abe", fontSize: 18, marginVertical: "5%" }}>
        Erro ao carregar videos
      </Text>
      <TouchableOpacity onPress={handleGetVideos}>
        <Text>
          <Ionicons name="reload" size={24} color="#037abe" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
