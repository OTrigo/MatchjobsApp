import { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { style } from "./styles";
import { signUp } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container, { Toast } from "toastify-react-native";

interface navigationProps {
  navigation: any; //arrumar a tipagem
  getData: () => Promise<void>;
}

export default function SignUp({ navigation, getData }: navigationProps) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleCreate() {
    setIsLoading(true);
    if (email === "" || password === "" || name === "") {
      return;
    }
    await signUp({ email, password, name }).then((result) => {
      setIsLoading(false);
      if (result) {
        setTimeout(() => {
          getData();
        }, 2000);
      }
    });
    setIsLoading(false);
  }
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Container duration={2000} height={50} width={300} />
      <Image source={require("../../../assets/logo.png")} style={style.logo} />
      <Text style={style.label}>Nome:</Text>
      <TextInput
        placeholder="João Carlos"
        style={style.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={style.label}>Email:</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="meuemail@mail.com"
        style={style.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={style.label}>Senha:</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="********"
        secureTextEntry={true}
        style={style.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={style.submit} onPress={handleCreate}>
        {isLoading ? (
          <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
            <ActivityIndicator color="#FFF" />
          </Text>
        ) : (
          <Text style={style.textcenter}>Criar conta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
