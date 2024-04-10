import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";

function handleCreate(){
    console.log('teste')
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Image source={require("../../../assets/logo.png")} style={style.logo} />
      <Text style={style.label}>Nome:</Text>
      <TextInput
        placeholder="Matheus Marazzi"
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
