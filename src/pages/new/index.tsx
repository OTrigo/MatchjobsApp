import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import ButtonAddVideo from "../../components/ButtonAddVideo";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigate } from "../../contexts/NavigationContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewPost from "../NewPost";
import PostVideo from "../PostVideo";

export default function New() {
  const Stack = createStackNavigator();
  return <NewPost />;
}
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
// import { useEffect, useState } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { isLogged } from "../../contexts/UserContext";
// import { navigate } from "../../contexts/NavigationContext";

// export default function App() {
//   const [facing, setFacing] = useState<CameraType>("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const verifyLogin = async () => {
//       const isLoggedStatus = await isLogged();
//       if (isLoggedStatus) {
//         setisLoggedIn(true);
//       }
//     };
//     verifyLogin();
//   }, []);
//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   return isLoggedIn ? (
//     <View style={styles.container}>
//       <CameraView style={styles.camera} facing={facing}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   ) : (
//     <View>
//       <Text>Voce precisa estar logado para acessar essa pagina</Text>
//       <TouchableOpacity onPress={() => navigate("SignIn")}>
//         <Text>Fazer login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   message: {
//     textAlign: "center",
//     paddingBottom: 10
//   },
//   camera: {
//     flex: 1
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     margin: 64
//   },
//   button: {
//     flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center"
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white"
//   }
// });
