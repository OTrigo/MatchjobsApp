import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { useState } from "react";
import { signIn } from "../../contexts/UserContext";
import { ImageBackground } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FlashMessage from "react-native-flash-message";

interface navigationProps {
  navigation: any; //arrumar a tipagem
}

export default function Signin({ navigation }: navigationProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    if (email === "" || password === "") {
      return;
    }
    await signIn({ email, password })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../../assets/backgroundLogin.jpeg")}
        className="h-2/5"
      >
        <Image
          source={require("../../../assets/logo.png")}
          className="max-w-96 max-h-96  self-center"
        />
      </ImageBackground>
      <View className=" bg-neutral-950 h-auto">
        <View className="w-full h-full rounded-md flex bg-center bg-gray-900 self-center">
          <Text className="text-lg text-white font-semibold ms-10 pt-10">
            Email:
          </Text>
          <TextInput
            className=" pl-5 w-10/12 border-solid border color-white border-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
            autoCapitalize="none"
            placeholder="meuemail@mail.com"
            value={email}
            onChangeText={setEmail}
          />
          <Text className="text-lg text-white font-semibold ms-10 pt-10">
            Senha:
          </Text>
          <TextInput
            className=" pl-5 w-10/12 border-solid border color-white border-white focus:border-blue-600 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400  "
            autoCapitalize="none"
            placeholder="********"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="w-7/12 h-10 self-center rounded bg-blue-600 items-center justify-center mt-10"
            onPress={handleLogin}
          >
            {isLoading ? (
              <Text className="text-center text-white font-semibold">
                <ActivityIndicator color="#FFF" />
              </Text>
            ) : (
              <Text className="text-center text-white font-semibold">
                Login
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Linkedin")}
            className="w-7/12 h-10 self-center rounded bg-blue-600 flex-row justify-evenly items-center  mt-10"
          >
            <Text className="text-lg text-white self-center">
              <Entypo name="linkedin" size={24} color="white" />
            </Text>
            <Text className="text-lg text-white self-center">
              Entrar com Linkedin
            </Text>
          </TouchableOpacity>
          <Text className="text-lg text-white pt-5 self-center">
            Ainda não tem uma conta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-lg text-blue-600 underline self-center">
              Crie sua conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text className="text-lg text-blue-600 underline self-center">
              Entrar sem login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
  );
}
