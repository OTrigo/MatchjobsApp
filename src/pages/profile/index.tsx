import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonAddPDF from "../../components/ButtonAddPDF";
import { Entypo } from "@expo/vector-icons";
import { InputEditable } from "../../components/Inputs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DeleteUser, UpdateUser } from "../../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { api } from "../../infra/axios";
import { FlatList } from "react-native";
import MyVideoComponent from "../../components/MyVideoComponent";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { navigate } from "../../contexts/NavigationContext";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { DocumentPickerResult } from "expo-document-picker";
import { UploadPDF } from "../../contexts/PDFContext";

interface JwtPayload {
  id: number;
  email: string;
  name: string;
  password: string;
  iat: number;
  exp: number;
}
interface myVideosProps {
  id: string;
  name: string;
  description: null | string;
  createdAt: string;
  userId: number;
  videoUrl: null | string;
  jobsId: null | number;
}
export default function Profile() {
  const [selectedPdf, setSelectedPDF] = useState<DocumentPickerResult | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [myVideos, setMyvideos] = useState<null | [myVideosProps]>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const focused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("@matchjobs");
      if (token) {
        const data = jwtDecode<JwtPayload>(token);
        setName(data.name);
        setEmail(data.email);
        setId(data.id);
        setisLoggedIn(true);
      }
    };
    getData();
  }, []);
  async function loggout() {
    await AsyncStorage.removeItem("@matchjobs");
    navigate("SignIn");
  }
  const handleUpdateUser = async () => {
    setIsLoading(true);
    const userData = await AsyncStorage.getItem("@matchjobs");
    const { id, name } = jwtDecode(userData);
    if (selectedPdf) {
      UploadPDF(selectedPdf?.assets[0], id + name).then(() => {
        setIsLoading(false);
      });
    }
    if (password != "") {
      await UpdateUser(email, password, id).then((response) => {
        showMessage({
          message: "usuario alterado, por favor realize o login novamente",
          type: "success"
        });
        loggout();
        setIsLoading(false);
      });
    } else {
      showMessage({
        message:
          "Por favor digite sua senha, caso contrario só seu curriculo será atualizado",
        type: "warning"
      });
    }
    setIsLoading(false);
  };
  const handleDeleteUser = async () => {
    DeleteUser(id).then(() => {
      loggout();
    });
  };
  const getMyVideos = async () => {
    const data = await api.get(`post/myposts/${id}`);
    setMyvideos(data.data.posts);
  };
  useEffect(() => {
    getMyVideos();
  }, [id, focused]);

  return isLoggedIn ? (
    <View className="flex h-full pt-3 bg-gray-900 w-full">
      <TouchableOpacity onPress={loggout} className="self-end pr-3 pt-10">
        <Entypo name="log-out" size={24} color="red" />
      </TouchableOpacity>
      <Text className="text-center font-bold text-xl w-fit color-white">
        Olá, {name}
      </Text>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="w-4/12 h-10 self-center rounded-md bg-blue-600 items-center mt-10 flex-row justify-evenly"
      >
        <Text className="text-center text-white">Editar dados</Text>
        <Ionicons name="person" size={17} color="white" />
      </TouchableOpacity>
      <View className="w-full border-t-2 border-blue-600 mt-10"></View>
      {myVideos && myVideos.length > 0 ? (
        <FlatList
          data={myVideos}
          renderItem={({ item }) => (
            <MyVideoComponent data={item} getVideos={getMyVideos} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      ) : (
        <Text className="text-center font-bold text-lg w-fit color-white">
          Você ainda não postou nenhum video
        </Text>
      )}

      <Modal animationType="fade" visible={isOpen} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            className="h-full max-w-4xl items-center justify-center"
          >
            <TouchableWithoutFeedback>
              <View className="bg-zinc-900 rounded items-center">
                <TouchableOpacity
                  onPress={() => setIsOpen(false)}
                  style={styles.closeIcon}
                >
                  <Text className="color-gray-500">
                    <AntDesign name="close" size={24} />
                  </Text>
                </TouchableOpacity>
                <Text className="text-center font-bold text-xl w-fit color-slate-50 mt-6">
                  Editar
                </Text>
                <View className="mt-3">
                  <Text className=" ml-10 font-bold text-lg w-fit color-white">
                    Email:
                  </Text>
                  <InputEditable
                    data={email}
                    setChange={setEmail}
                    isPassword={false}
                  />
                  <Text className=" ml-10 font-bold text-lg w-fit color-white">
                    Senha:
                  </Text>
                  <InputEditable
                    data={password}
                    setChange={setPassword}
                    isPassword={true}
                  />
                  <ButtonAddPDF
                    selectedPdf={selectedPdf}
                    setSelectedPDF={setSelectedPDF}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleUpdateUser}
                  className=" h-12 self-center rounded-md bg-blue-600 items-center mt-5 flex-row p-3"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text className=" font-bold text-lg text-center w-4/12 color-white">
                      Atualizar dados
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteUser}
                  className="h-12 self-center rounded-md bg-red-600 items-center mt-5 flex-row p-3 mb-10"
                >
                  <Text className=" font-bold text-lg text-center w-4/12 color-white">
                    Deletar conta
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <FlashMessage position="top" />
    </View>
  ) : (
    <View>
      <Text>Voce precisa estar logado para acessar essa pagina</Text>
      <TouchableOpacity onPress={() => navigate("SignIn")}>
        <Text>Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}
