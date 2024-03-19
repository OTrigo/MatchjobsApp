import { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { styles } from "./styles";
import { mockedPosts } from "./mockedPosts";
import { FeedItem } from "../../components/FeedItem";

const { height: heightScreen } = Dimensions.get("screen");

export default function Home() {
  const [showItem, setShowItem] = useState(mockedPosts[0]);
  //eslint-disable-next-line
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems?.length > 0) {
      setShowItem(mockedPosts[viewableItems[0].index]);
    }
  });

  return (
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
  );
}
