import { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { signUp } from "../../contexts/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";

interface navigationProps {
  navigation: any; //arrumar a tipagem
  getData: () => Promise<void>;
}

export default function SignUp({ navigation, getData }: navigationProps) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleCreate() {
    if (email === "" || password === "" || name === "") {
      return;
    }
    setIsLoading(true);
    await signUp({ email, password, name }).then(() => {
      setIsLoading(false);
    });
    setIsLoading(false);
    getData();
  }
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <ImageBackground
        source={require("../../../assets/backgroundSignup.jpeg")}
        className="h-2/5 flex "
      >
        <TouchableOpacity
          className="m-5 mt-10 bg-gray-900 max-w-10 h-10 items-center rounded-full justify-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="color-blue-600">
            <Ionicons name="arrow-back-sharp" size={24} />
          </Text>
        </TouchableOpacity>
        <Image
          source={require("../../../assets/logo.png")}
          className="max-w-96 max-h-96 mt-2 self-center"
        />
      </ImageBackground>
      <View className="flex bg-gray-900 h-full pt-10 " style={{ flex: 1 }}>
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Nome:
        </Text>
        <TextInput
          placeholder="João Carlos"
          className="w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={name}
          onChangeText={setName}
        />
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Email:
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="meuemail@mail.com"
          className="w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-lg text-white font-semibold ms-10 pt-7">
          Senha:
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="********"
          secureTextEntry={true}
          className="w-10/12 border-solid border border-white color-white focus:border-blue-400 h-12 rounded-md self-center placeholder:italic placeholder:text-slate-400 "
          value={password}
          onChangeText={setPassword}
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
      </View>
    </>
  );
}
