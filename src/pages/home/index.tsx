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

const { height: heightScreen } = Dimensions.get("screen");

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getVideos() {
      setLoading(true);
      const videos: any = await api.get("post/");
      if (!videos) {
        return;
      }
      setMockedPost(videos.data);
      setLoading(false);
    }
    getVideos();
  }, []);
  const [mockedPosts, setMockedPost] = useState([]);
  const [showItem, setShowItem] = useState(mockedPosts[0]);
  //eslint-disable-next-line
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems?.length > 0) {
      setShowItem(mockedPosts[viewableItems[0].index]);
    }
  });

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

      <FlatList
        data={mockedPosts}
        renderItem={({ item }) => (
          <FeedItem data={item} currentVisibleitem={showItem} />
        )}
        onViewableItemsChanged={onViewRef?.current}
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
    </View>
  ) : (
    <Text>Erro ao carregar videos</Text>
  );
}
