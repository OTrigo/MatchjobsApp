import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataProps } from "../../types/getData";
import ButtonAddPDF from "../../components/ButtonAddPDF";




export default function Profile({getData}:getDataProps) {
  async function loggout(){
    await AsyncStorage.removeItem('@matchjobs');
    getData();
  }
  return (
    <View style={styles.container}>
      <Text>Página de Profile</Text>
      <TouchableOpacity onPress={loggout} style={{alignSelf: 'center', marginTop: 300}}>
        <Text style={{color:'red'}}>Loggout</Text>
      </TouchableOpacity>
      <ButtonAddPDF/>
    </View>
  );
}