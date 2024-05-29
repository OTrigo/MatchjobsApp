import { ActivityIndicator, StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import Signin from "./src/pages/Signin";
import SignUp from "./src/pages/SignUp";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./src/infra/axios";
import { View } from "react-native";

export default function App() {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator();
  async function getData() {
    setLogin(false);
    setIsLoading(true);
    const data = await AsyncStorage.getItem("@matchjobs");
    if (data !== null) {
      const config = `bearer ${data}`;
      const response = await api
        .get("/user/me", {
          headers: {
            Authorization: config.split('"').join("")
          }
        })
        .then((response) => {
          if (response.status == 200) {
            setLogin(true);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <>
      <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        {login ? (
          <Routes getData={getData} />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {(props) => <Signin {...props} getData={getData} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {(props) => <SignUp {...props} getData={getData} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        <ActivityIndicator size={40} color="#037abe" />
      </Text>
    </View>
  );
}
