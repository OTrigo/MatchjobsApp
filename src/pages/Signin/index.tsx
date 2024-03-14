import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { useState } from "react";
import { api } from "../../infra/axios";

export default function Signin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 

    async function login(){
        try{
            const response = await api.post('login/',{
                email:email,
                password:password
            })
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }


  return (
    <View>
      <Image source={require("../../../assets/logo.png")} style={style.logo} />
      <TextInput
        placeholder="meuemail@mail.com"
        style={style.input}
        value={email}
        onChangeText={setEmail}
        />
      <TextInput
        placeholder="********"
        secureTextEntry={true}
        style={style.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={style.submit} onPress={login}>
        <Text style={style.textecenter}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
