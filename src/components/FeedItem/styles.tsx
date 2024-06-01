import { StyleSheet, Dimensions, Platform } from "react-native"

const {height: heightScreen} = Dimensions.get("screen")

export const styles = StyleSheet.create({
  container:{
  },
  video:{
    width: '100%',
    height: heightScreen,
  },
  info:{
    position: 'absolute',
    zIndex: 99,
    left: 8,
    padding: 8
  },
  name:{
    color:'#fff',
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor:  'rgba(0,0,0, 0.60)',
    textShadowOffset: {width: -1, height: 1.5},
    textShadowRadius: 8

  },
  description:{
    color:'#fff',
    marginRight: 24,
    textShadowColor:  'rgba(0,0,0, 0.20)',
    textShadowOffset: {width: -1, height: 1.5},
    textShadowRadius: 8

  },
  actions:{
    position: 'absolute',
    zIndex: 99,
    right: 10,
    bottom: Platform.OS === 'android' ? 120 : 170,
    gap: 8,
  },
  actionText:{
    textAlign: 'center',
    color:'#FFF',
    textShadowColor:  'rgba(0,0,0, 0.20)',
    textShadowOffset: {width: -1, height: 1.5},
    textShadowRadius: 8
  },
  actionButton:{}
})