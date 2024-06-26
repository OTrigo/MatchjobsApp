import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { style } from "./styles";
import { useState } from "react";
import { signIn } from "../../contexts/UserContext";

interface navigationProps {
  navigation: any; //arrumar a tipagem
  getData: () => Promise<void>;
}

export default function Signin({ navigation, getData }: navigationProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    if (email === "" || password === "") {
      return;
    }
    await signIn({ email, password }).then(() => {
      setIsLoading(true);
    });
    setIsLoading(true);
    getData();
  }

  return (
    <View>
      <Image source={require("../../../assets/logo.png")} style={style.logo} />
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
      <TouchableOpacity style={style.submit} onPress={handleLogin}>
        {isLoading ? (
          <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
            <ActivityIndicator color="#FFF" />
          </Text>
        ) : (
          <Text style={style.textecenter}>Enviar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={style.Link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
