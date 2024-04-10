import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes'
import Signin from './src/pages/Signin'
import SignUp from './src/pages/SignUp'
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';

export default function App () {
  const login = false;
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      {(login) ?
       <Routes />
        : 
      <Stack.Navigator>
        <Stack.Screen name="SignIn" options={{headerShown: false}} component={Signin}/>
        <Stack.Screen name="SignUp" component={SignUp}/> 
      </Stack.Navigator>
      
      }
    </NavigationContainer>
  )
}
