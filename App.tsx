import { StatusBar, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes'
import Signin from './src/pages/Signin'
import SignUp from './src/pages/SignUp'
import 'react-native-gesture-handler';
import { Image } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App () {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Stack = createStackNavigator();
  async function getData(){
    setIsLoading(true);
    const data = await AsyncStorage.getItem('@matchjobs');
    if(data !== null){
      setLogin(true);
    }else{
      setLogin(false)
    }
    setIsLoading(false)
  }
  useEffect(()=>{
    getData();
  },[])

  return (
    (!isLoading) ? <>
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      {(login) ?
       <Routes getData={getData} />
        : 
      <Stack.Navigator>
        <Stack.Screen name="SignIn" options={{headerShown: false}}>
            {(props) => <Signin {...props} getData={getData} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}/> 
      </Stack.Navigator>
      
      }
    </NavigationContainer>
    </> : <Text style={{textAlign: 'center', fontSize: 40, marginTop: 200 }}>Carregando...</Text>
  )
}
