import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Routes } from './src/routes'
import Signin from './src/pages/Signin'

export default function App () {
  const login = false;
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      {(login) ? <Routes /> : <Signin/>}
    </NavigationContainer>
  )
}
