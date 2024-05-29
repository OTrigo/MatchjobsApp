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
import { getDataProps } from "../../types/getData";
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

interface JwtPayload {
  id: number;
  email: string;
  name: string;
  password: string;
  iat: number;
  exp: number;
}
interface myVideosProps {
  id: number;
  name: string;
  description: null | string;
  createdAt: string;
  userId: number;
  videoUrl: null | string;
  jobsId: null | number;
}
export default function Profile({ getData }: getDataProps) {
  const [name, setName] = useState<string>("");
  const [myVideos, setMyvideos] = useState<null | [myVideosProps]>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const focused = useIsFocused();

  useEffect(() => {
    const getAsyncData = async () => {
      const token = await AsyncStorage.getItem("@matchjobs");
      if (!token) {
        loggout();
        return;
      }
      const data = jwtDecode<JwtPayload>(token);
      setName(data.name);
      setEmail(data.email);
      setId(data.id);
      setPassword(data.password);
    };

    getAsyncData();

    console.log(`post/myposts/${id}`);
  }, []);
  async function loggout() {
    await AsyncStorage.removeItem("@matchjobs");
    getData();
  }
  const handleUpdateUser = async () => {
    setIsLoading(true);
    await UpdateUser(email, password, id)
      .then(() => {
        alert("usuario alterado, por favor realize o login novamente");
        loggout();
      })
      .then(() => {
        setIsLoading(false);
      });
    setIsLoading(false);
  };
  const handleDeleteUser = () => {
    DeleteUser(id);
    loggout();
  };
  useEffect(() => {
    const getMyVideos = async () => {
      const data = await api.get(`post/myposts/${id}`);
      setMyvideos(data.data);
      console.log(myVideos);
    };
    getMyVideos();
  }, [id, focused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={loggout} style={styles.loggout}>
        <Entypo name="log-out" size={24} color="red" />
      </TouchableOpacity>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        Olá, {name}
      </Text>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[styles.updateButton]}
      >
        <Text style={(styles.textButton, { color: "#000" })}>Editar dados</Text>
      </TouchableOpacity>
      <View style={styles.videosContainer}></View>
      {myVideos && myVideos.length > 0 ? (
        <FlatList
          data={myVideos}
          renderItem={({ item }) => <MyVideoComponent data={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
      ) : (
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}>
          Você ainda não postou nenhum video
        </Text>
      )}

      <Modal animationType="fade" visible={isOpen} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={() => setIsOpen(false)}
                  style={styles.closeIcon}
                >
                  <Text>
                    <AntDesign name="close" size={24} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.title}>Editar</Text>
                <View style={styles.inputs}>
                  <Text style={{ marginLeft: "7%" }}>Email:</Text>
                  <InputEditable data={email} setChange={setEmail} />
                  <Text style={{ marginLeft: "7%" }}>Senha:</Text>
                  <InputEditable data={password} setChange={setPassword} />
                  <ButtonAddPDF />
                </View>
                <TouchableOpacity
                  onPress={handleUpdateUser}
                  style={styles.updateModalButton}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={{ color: "#FFF" }}>Atualizar dados</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteUser}
                  style={[styles.updateModalButton, { backgroundColor: "red" }]}
                >
                  <Text style={styles.textButton}>Deletar conta</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
