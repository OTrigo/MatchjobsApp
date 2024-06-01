import axios from "axios";
import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    await AsyncStorage.setItem(
      "@matchjobs",
      JSON.stringify(response.data.access_token)
    );
  } catch (err: any) {
    //arrumar tipagem
    if (err.response.status === 401) {
      alert("Email ou senha invalido");
      return;
    }
    console.error(err);
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
  } catch (err: any) {
    //arrumar tipagem
    if (err.response.status === 409) {
      alert("Email já cadastrado");
      return;
    }
    console.error(err);
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
      console.log(result.data)
    }).catch ((err: any)=> {
    console.error(err.data);
    console.log(result)
  })
}
async function DeleteUser(id:number){
  const end = `user/${id}`
  console.log(end)
    const result = 
    await axios.delete(`https://matchjobsbackend-7lo5.onrender.com/${end}`).then((response)=>{
      console.log(response.data)
      alert("usuario deletado com sucesso!")
    }).catch((error) =>{
      console.log(error)
  })
}

export { signIn, signUp, UpdateUser,  DeleteUser };
