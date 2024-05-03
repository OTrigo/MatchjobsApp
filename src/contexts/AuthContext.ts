import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface HandleLoginProp {
  email: string;
  password: string;
}
interface UserProp {
  name: string;
  email: string;
  password: string;
}

async function signIn({ email, password }: HandleLoginProp) {
  try {
    const response = await api.post("user/signIn/", {
      email,
      password
    });
    await AsyncStorage.setItem("@matchjobs", JSON.stringify(response.data));

  } catch (err:any) {//arrumar tipagem
    if(err.response.status === 401){
      alert('Email ou senha invalido');
      return
    }
    console.error(err);
    
  }
}
async function signUp({ email, password, name }: UserProp) {
  try {
    const response = await api.post("user/signUp", {
      name,
      email,
      password
    });
    await AsyncStorage.setItem("@matchjobs", JSON.stringify(response.data));
    
    
    
  } catch (err:any) {//arrumar tipagem
    if(err.response.status === 409){
      alert('Email já cadastrado');
      return
    }
    console.error(err);
    
  }
}

export { signIn, signUp };
