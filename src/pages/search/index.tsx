import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, Dimensions } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { api } from "../../infra/axios";
import { postProps } from "../../types/postProps";
import SearchVideo from "../../components/SearchVideo";
import { FeedItem } from "../../components/FeedItem";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  async function getPosts() {
    const allPosts = await api.get("post/").then((res) => {
      return res.data;
    });

    setAllPosts(allPosts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  const [search, setSearch] = useState("");
  const [allPosts, setAllPosts] = useState<postProps[]>([]);
  const [filteredPost, setFilteredPost] = useState<postProps[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [indexVideo, setIndexVideo] = useState(0);
  const { height: heightScreen } = Dimensions.get("screen");
  const [showItem, setShowItem] = useState(null);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const handleSubmit = () => {
    filterPosts(search);
  };

  useEffect(() => {
    filterPosts(search);
  }, [search]);

  const filterPosts = (toSearch: string) => {
    if (toSearch != "") {
      const filtered = allPosts?.filter(
        (item: postProps) =>
          (item.title &&
            item.title.toLowerCase().includes(toSearch.toLowerCase())) ||
          (item.description &&
            item.description.toLowerCase().includes(toSearch.toLowerCase()))
      );

      if (filtered) {
        setFilteredPost(filtered);
      }
    } else {
      setFilteredPost([]);
    }
  };

  return (
    <View className="pt-10 bg-gray-900 h-full">
      <View className=" w-full flex-row pl-12 items-center">
        {isFullscreen ? (
          <TouchableOpacity
            className="mt-10 bg-gray-900 w-10 h-10 items-center rounded-full justify-center"
            onPress={() => setIsFullscreen(false)}
          >
            <Text className="color-blue-600">
              <Ionicons name="arrow-back-sharp" size={24} />
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TextInput
          className="bg-white w-4/6 rounded-full pl-5 mr-5 mt-5"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <Text className="mt-4 color-blue-600 ">
            <EvilIcons name="search" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
      {filterPosts.length > 0 ? (
        isFullscreen ? (
          <FlatList
            data={filteredPost}
            renderItem={({ item }) => (
              <FeedItem data={item} currentVisibleitem={showItem} />
            )}
            initialScrollIndex={indexVideo}
            onScrollToIndexFailed={() => {}}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item: postProps) => item.id}
            snapToAlignment="center"
            snapToInterval={heightScreen}
            scrollEventThrottle={200}
            decelerationRate={"fast"}
            showsVerticalScrollIndicator={false}
            key={"flatlist-feed"}
          />
        ) : (
          <FlatList
            data={filteredPost}
            numColumns={3}
            renderItem={({ item, index }) => (
              <SearchVideo
                post={item}
                setIsFullscreen={setIsFullscreen}
                setIndexVideo={setIndexVideo}
                currentIndex={index}
              />
            )}
            keyExtractor={(item) => item.id}
            key={"flatlist-mini"}
          />
        )
      ) : (
        <Text className="color-white">Nenhum item encontrado.</Text>
      )}
    </View>
  );
}
