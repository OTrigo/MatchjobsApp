import { View, Text, TouchableOpacity } from "react-native";
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
  const [password, setPassword] = useState<string>("************");
  const [email, setEmail] = useState<string>("");
  const id = 8;

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
    };
    getAsyncData();
  }, []);
  async function loggout() {
    await AsyncStorage.removeItem("@matchjobs");
    getData();
  }
  const handleUpdateUser = () => {
    UpdateUser({ name, id });
    loggout();
  };
  const handleDeleteUser = () => {
    DeleteUser({ id });
    loggout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={loggout} style={styles.loggout}>
        <Entypo name="log-out" size={24} color="red" />
      </TouchableOpacity>
      <View style={styles.inputs}>
        <InputEditable data={name} setChange={setName} />
        <InputEditable data={password} setChange={setPassword} />
        <InputEditable data={email} setChange={setEmail} />
      </View>
      <TouchableOpacity onPress={handleUpdateUser} style={styles.updateButton}>
        <Text style={styles.textButton}>Atualizar Dados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeleteUser}
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
    </View>
  );
}
