import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { signUp } from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface navigationProps{
  navigation: any;//arrumar a tipagem
  getData: ()=>Promise<void>
}

export default function SignUp({navigation,getData}:navigationProps) {
  async function handleCreate(){
    if (email === "" || password === "" || name === "") {
      return;
    }
    await signUp({ email, password, name });
    getData();
    
  }  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
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
      <TouchableOpacity style={style.submit} onPress={handleCreate}>
        <Text style={style.textecenter}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
