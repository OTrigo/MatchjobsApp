import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView
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
import { Video } from "expo-av";

interface JwtPayload {
  id: number;
  email: string;
  name: string;
  password: string;
  iat: number;
  exp: number;
}

export default function Profile({ getData }: getDataProps) {
  const [name, setName] = useState<string>("");
  const [myVideos, setMyvideos] = useState(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmated, setIsConfirmated] = useState<boolean>(false);

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
  }, []);
  async function loggout() {
    await AsyncStorage.removeItem("@matchjobs");
    getData();
  }
  const handleUpdateUser = async () => {
    UpdateUser(email, name, password, id);
    loggout();
  };
  const handleDeleteUser = () => {
    setIsOpen(true);
    if (isConfirmated) {
      DeleteUser(id);
      loggout();
    }
  };

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
      <ScrollView style={styles.videosContainer}>
        {myVideos ? (
          <Video />
        ) : (
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}
          >
            Você ainda não postou nenhum video
          </Text>
        )}
      </ScrollView>
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
                  <Text style={styles.textButton}>Atualizar Dados</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
