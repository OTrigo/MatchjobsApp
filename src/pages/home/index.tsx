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

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50
};

const { height: heightScreen } = Dimensions.get("screen");

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [showItem, setShowItem] = useState(null);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const visibleItem = viewableItems[0]?.item;
      setShowItem(visibleItem);
    }
  });

  async function getVideos() {
    setLoading(true);
    const videos = await api.get("post/");
    if (!videos) {
      return;
    }
    setPosts(videos.data);
    setLoading(false);
  }
  const handleRefresh = async () => {
    setRefreshing(true);
    await getVideos();
    setRefreshing(false);
  };

  useEffect(() => {
    async function getUserData() {
      const storage = await AsyncStorage.getItem("@matchjobs");
      const userd = jwtDecode(storage ? storage : "");
      setUser(userd);
    }
    getVideos();
    getUserData();
  }, []);

  return !loading ? (
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
          data={posts}
          renderItem={({ item }) => (
            <FeedItem
              data={item}
              currentVisibleitem={showItem}
              userData={user}
            />
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(item) => item.id.toString()}
          snapToAlignment="center"
          snapToInterval={heightScreen}
          scrollEventThrottle={200}
          decelerationRate={"fast"}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
        />
      </GestureHandlerRootView>
    </View>
  ) : (
    <Text>Erro ao carregar vídeos</Text>
  );
}
