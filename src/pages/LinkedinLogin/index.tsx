import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { jwtDecode } from "jwt-decode";
import AntDesign from '@expo/vector-icons/AntDesign';
import { navigate } from "../../contexts/NavigationContext";
import { api } from "../../infra/axios";

export default function LinkedinLogin() {
  const [userInfo, setUserInfo] = useState(null);
  const [code, setCode] = useState(null);
  const clientId = process.env.EXPO_PUBLIC_CLIENT_LINKEDIN;
  const client_secret = process.env.EXPO_PUBLIC_SECRET_LINKEDIN;
  const redirectUri = process.env.EXPO_PUBLIC_API+'redirect';
  const scope = "profile email openid";
  const authUrl = "https://www.linkedin.com/oauth/v2/authorization";
  const TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
  const [showWebView, setShowWebView] = useState(true);
  const [hasAccount, sethasAccount] = useState(false);
  useEffect(() => {
    return () => {
    };
  }, [showWebView])

  

  const handleNavigationStateChange = async (navState: any) => {
    const url = navState.url;

    if (url.includes("?code=")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const codeValue = urlParams.get("code");

      // if (codeValue) {
      //   const response = await getDataFromLinkedin(codeValue);
      //   verifyHasAccount();
      //   if(userInfo && hasAccount!== true){
      //     navigate('Password')
      //   }else{
      //     navigate('Home')
      //   }
      // }
    }
  };
  async function verifyHasAccount(){
    const has = await api.get(`/user/find/${userInfo.email}`).then(()=>{
      sethasAccount(true)
    }).catch(()=>{
      return
    })
    
  }
  async function getDataFromLinkedin(code: string) {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${client_secret}`
    });

    const data = await response.json();
    setCode(data);
    const dataUser = jwtDecode(data.id_token);
    setUserInfo(dataUser);
  }

  return !userInfo ? (
    <View className="bg-neutral-950 h-full justify-center">
      {!showWebView ? (
        <>
          <TouchableOpacity onPress={() => setShowWebView(true)}
            className="w-7/12 h-10 self-center rounded bg-blue-600 flex-row justify-evenly items-center  mt-10"
            >
            <Text className="text-center text-white font-semibold">
              Tentar novamente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('SignIn')} 
            className="w-7/12 h-10 self-center rounded bg-red-600 flex-row justify-evenly items-center  mt-10">
            <Text className="text-center text-white font-semibold">
                Voltar
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ flex: 1, marginTop: "10%" }}>
          <TouchableOpacity onPress={() => setShowWebView(false)} className="w-1/12 rounded-full self-end items-center">
            <Text>
              <AntDesign name="close" size={24} color="#2563eb" />
            </Text>
          </TouchableOpacity>
          <WebView
            source={{
              uri: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
            }}
            style={{ flex: 1 }}
            onNavigationStateChange={handleNavigationStateChange}
          />
        </View>
      )}
    </View>
  ) : (
    <View style={{marginTop:200}}>
        <Text>Email-> {userInfo.email}</Text>
        <Text>Name-> {userInfo.name}</Text>
        <Image style={{width:300, height:300}} source={{uri:userInfo.picture}}/>

    </View>
  );
};
