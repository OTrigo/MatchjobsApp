import { ActivityIndicator, StatusBar, Text } from "react-native";
import "./src/styles/global.css";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import Signin from "./src/pages/Signin";
import SignUp from "./src/pages/SignUp";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View } from "react-native";
import LinkedinLogin from "./src/pages/LinkedinLogin";
import { isLogged } from "./src/contexts/UserContext";
import { navigate, navigationRef } from "./src/contexts/NavigationContext";
import PostVideo from "./src/pages/PostVideo";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator();

  useEffect(() => {
    async function verifyLogin() {
      const isLoggedStatus = await isLogged();
      setIsLoading(false);
      if (isLoggedStatus == true) {
        navigate("Main");
      }
      setIsLoading(false);
    }
    verifyLogin();
  });

  return !isLoading ? (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Stack.Navigator>
        <Stack.Screen name="SignIn" options={{ headerShown: false }}>
          {(props) => <Signin {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PostVideo" options={{ headerShown: false }}>
          {(props) => <PostVideo {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{ headerShown: false }}>
          {(props) => <SignUp {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Linkedin" options={{ headerShown: false }}>
          {() => <LinkedinLogin />}
        </Stack.Screen>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {(props) => <Routes {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        <ActivityIndicator size={40} color="#037abe" />
      </Text>
    </View>
  );
}
