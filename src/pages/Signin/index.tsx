import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useState } from "react";
import { signIn } from "../../contexts/UserContext";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    <>
      <ImageBackground
        source={require("../../../assets/backgroundLogin.jpeg")}
        className="h-2/5"
      >
        <Image
          source={require("../../../assets/logo.png")}
          className="max-w-96 max-h-96 mt-20 z-10 self-center"
        />
      </ImageBackground>
      <View className=" bg-neutral-950 h-auto">
        <View className="w-11/12 h-3/4 rounded-md flex bg-center bg-gray-900 self-center z-20">
          <Text className="text-lg text-white font-semibold ms-10 pt-10">
            Email:
          </Text>
          <TextInput
            className="w-10/12 border-solid border color-white border-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
            autoCapitalize="none"
            placeholder="meuemail@mail.com"
            value={email}
            onChangeText={setEmail}
          />
          <Text className="text-lg text-white font-semibold ms-10 pt-10">
            Senha:
          </Text>
          <TextInput
            className="w-10/12 border-solid border color-white border-white focus:border-blue-600 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400  "
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

          <Text className="text-lg text-white pt-5 self-center">
            Ainda não tem uma conta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-lg text-blue-600 underline self-center">
              Crie sua conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
