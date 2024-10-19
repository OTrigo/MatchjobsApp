import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedbackBase
} from "react-native";
import ButtonAddVideo from "../../components/ButtonAddVideo";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createPost } from "../../contexts/VideoContext";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <>
      <View className="flex h-full pt-3 bg-gray-900 w-full">
        <Text className="color-white mt-5 ml-10 mb-2">Titulo:</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          className=" pl-5 w-10/12 border-solid border color-white border-white focus:border-blue-600 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400  "
        />
        <Text className="color-white mt-5 ml-10 mb-1">Descrição:</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          className="pl-5 w-10/12 border-solid border color-white border-white focus:border-blue-600 h-24 rounded-md self-center placeholder:italic placeholder:text-slate-400"
        />
        <TouchableOpacity
          onPress={() =>
            createPost({
              title,
              description: desc,
              setTitle,
              setDescription: setDesc
            })
          }
          style={{
            width: "58%",
            height: 25,
            backgroundColor: "#2563EB",
            alignSelf: "center",
            marginTop: 10,
            borderRadius: 4
          }}
          className="w-7/12 h-10 self-center rounded bg-blue-600 items-center justify-center mt-10"
        >
          <Text className="color-white text-center">Próximo</Text>
        </TouchableOpacity>
      </View>
      <View>
        <StatusBar hidden />
      </View>
    </>
  );
}
