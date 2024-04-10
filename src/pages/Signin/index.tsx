import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { useState } from "react";
import { signIn } from "../../contexts/AuthContext";



//arrumar a tipagem
export default function Signin({navigation}:any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }
    signIn({ email, password });
  }

  return (
    <View>
      <Image source={require("../../../assets/logo.png")} style={style.logo} />
      <Text style={style.label}>Email:</Text>
      <TextInput
        placeholder="meuemail@mail.com"
        style={style.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={style.label}>Senha:</Text>
      <TextInput
        placeholder="********"
        secureTextEntry={true}
        style={style.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={style.submit} onPress={handleLogin}>
        <Text style={style.textecenter}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={style.Link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
