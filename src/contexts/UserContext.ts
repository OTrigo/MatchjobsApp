import axios from "axios";
import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container, { Toast } from 'toastify-react-native';

interface HandleLoginProp {
  email: string;
  password: string;
}
interface UserProp {
  id: Number;
  name: string;
  email: string;
  password: string;
}


async function signIn({ email, password }: HandleLoginProp) {
  try {
    const response = await api.post("auth/signIn/", {
      email,
      password
    });
    Toast.success("login efetuado!", "top")
    await AsyncStorage.setItem(
      "@matchjobs",
      JSON.stringify(response.data.access_token)

    );
    return true;
  } catch (err: any) {
    //arrumar tipagem
    if (err.response.status === 401) {
      Toast.error("Email ou senha invalido", 'Top');
      return false
    }
    
  }
}
async function signUp({ email, password, name }: UserProp) {
  try {
    const response = await api.post("auth/signUp", {
      name,
      email,
      password
    });

    await AsyncStorage.setItem(
      "@matchjobs",
      JSON.stringify(response.data.access_token)
    );
    Toast.success("Conta Criada!", "Top");
    return true
  } catch (err: any) {
    //arrumar tipagem
    if (err) {
      Toast.error("Erro ao criar conta", "Top");
      return false
    }
    
  }
}
async function UpdateUser(email:string, password: string, id:number){
  const token = await AsyncStorage.getItem("@matchjobs")
  const config = `bearer ${token}`
  const result =
    await api.put(`user/${id}`, {
      email: email,
      password: password,
    },{
      headers:{
        Authorization: config.split('"').join('')
      }

    }).then((result)=>{
      Toast.success("alteração feita com sucesso")
      return true
    }).catch ((err: any)=> {

    return false
  })
}
async function DeleteUser(id:number){
  const end = `user/${id}`;
    await axios.delete(`https://matchjobsbackend-7lo5.onrender.com/${end}`).then(()=>{
      Toast.success("usuario deletado com sucesso!", "Top")
      return true;
    }).catch((error) =>{
      return false
  })
}

export { signIn, signUp, UpdateUser,  DeleteUser };
