import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { signUp } from "../../contexts/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface navigationProps {
  navigation: any; //arrumar a tipagem
}

export default function SignUp({ navigation }: navigationProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function getLinkedinData() {
      const LinkedinToken = await AsyncStorage.getItem("@linkedinToken");
      showMessage({
        message: "Por favor defina uma senha para proximos acessos",
        type: "warning"
      });
      if (LinkedinToken) {
        const dataUser = jwtDecode(LinkedinToken);
        setEmail(dataUser.email);
        setName(dataUser.name);
      }
    }
    getLinkedinData();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  async function handleCreate() {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === ""
    ) {
      showMessage({
        message: "Preencha todos os campos",
        type: "warning",
        icon: "warning"
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: "Senhas diferentes por favor confira!",
        description: "This is our second message",
        type: "danger",
        icon: "danger"
      });
      return;
    }

    setIsLoading(true);
    await signUp({ email, password, name }).then(() => {
      setIsLoading(false);
    });
    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 mt-10"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../../assets/mjfundo.jpg")}
        className="h-2/6 flex "
      >
        <View className="flex flex-row w-full justify-between">
          <TouchableOpacity
            className="m-5 mt-10 bg-gray-900 w-10 h-10 items-center rounded-full justify-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="color-blue-600">
              <Ionicons name="arrow-back-sharp" size={24} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="m-5 mt-10 bg-gray-900 w-10 h-10 items-center rounded-full justify-center"
            onPress={
              showPassword
                ? () => setShowPassword(false)
                : () => setShowPassword(true)
            }
          >
            <Text className="color-blue-600">
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View className="flex bg-gray-900 h-full  " style={{ flex: 1 }}>
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Nome:
        </Text>
        <TextInput
          placeholder="João Carlos"
          className="pl-4 w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={name}
          onChangeText={setName}
        />
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Email:
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="meuemail@mail.com"
          className="pl-4 w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Senha:
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="********"
          secureTextEntry={showPassword}
          className="pl-4 w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={password}
          onChangeText={setPassword}
        />
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Repita a senha:
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="********"
          secureTextEntry={showPassword}
          className="pl-4 w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="w-7/12 h-10 self-center rounded bg-blue-600 items-center justify-center mt-10"
          onPress={handleCreate}
        >
          {isLoading ? (
            <Text className="text-lg text-white font-semibold self-center">
              <ActivityIndicator color="#FFF" />
            </Text>
          ) : (
            <Text className="text-lg text-white font-semibold self-center">
              Criar conta
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
            Criar conta com Linkedin
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
  );
}
