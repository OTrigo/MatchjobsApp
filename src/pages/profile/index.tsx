import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataProps } from "../../types/getData";
import ButtonAddPDF from "../../components/ButtonAddPDF";
import { Entypo } from "@expo/vector-icons";
import { InputEditable, InputNotEditable } from "../../components/Inputs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DeleteUser, UpdateUser } from "../../contexts/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      console.log(data.id);
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
      <View style={styles.inputs}>
        <InputNotEditable data={name} />
        <InputEditable data={password} setChange={setPassword} />
        <InputEditable data={email} setChange={setEmail} />
      </View>
      <TouchableOpacity onPress={handleUpdateUser} style={styles.updateButton}>
        <Text style={styles.textButton}>Atualizar Dados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[styles.updateButton, { backgroundColor: "red" }]}
      >
        <MaterialCommunityIcons
          name="account-cancel-outline"
          size={24}
          color="black"
        />
        <Text style={styles.textButton}>Deletar conta</Text>
      </TouchableOpacity>
      <ButtonAddPDF />
      <Modal animationType="fade" visible={isOpen} transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Tem certeza que deseja deletar sua conta?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsConfirmated(true);
                handleDeleteUser();
              }}
              style={{ marginRight: "60%" }}
            >
              <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
                Sim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text
                style={{ fontSize: 20, color: "#037abe", fontWeight: "bold" }}
              >
                Não
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
