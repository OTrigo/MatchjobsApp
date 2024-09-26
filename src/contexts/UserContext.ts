import axios from "axios";
import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./NavigationContext";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

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
    showMessage({
      message: "Login efetuado!",
      type: "success"
    });
    setTimeout(() => {
      navigate("Main");
    }, 2000);
  } catch (err: any) {
    if (err.response.status === 401) {
      showMessage({
        message: "Email ou senha inválido!",
        type: "danger"
      });
      return;
    }
    console.error(" erro", err);
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
    showMessage({
      message: "Conta criada com sucesso",
      type: "success"
    });
    setTimeout(() => {
      navigate("Main");
    }, 2000);
  } catch (err: any) {
    //arrumar tipagem
    if (err.response.status === 409) {
      showMessage({
        message: "Email já existente!",
        type: "danger"
      });
      return;
    }
    showMessage({
      message: err.response.data.message[0],
      type: "danger"
    });
  }
}
async function UpdateUser(email: string, password: string, id: number) {
  const token = await AsyncStorage.getItem("@matchjobs");
  const config = `bearer ${token}`;
  const result = await api
    .put(
      `user/${id}`,
      {
        email: email,
        password: password
      },
      {
        headers: {
          Authorization: config.split('"').join("")
        }
      }
    )
    .then((result) => {
      console.log(result.data);
    })
    .catch((err: any) => {
      console.error(err.data);
      console.log(result);
    });
}
async function DeleteUser(id: string) {
  const token = await AsyncStorage.getItem("@matchjobs");
  const config = `bearer ${token}`;

  const end = `user/${id}`;
  console.log(end);
  const result = await axios
    .delete(`${process.env.EXPO_PUBLIC_API + end}`, {
      headers: {
        Authorization: config.split('"').join("")
      }
    })
    .then((response) => {
      showMessage({
        message: "deletado com sucesso",
        type: "success"
      });
    })
    .catch((error) => {
      console.log(error.data);
      showMessage({
        message: "Algo deu errado, tente de novo mais tarde",
        type: "danger"
      });
    });
}
async function isLogged(): Promise<boolean> {
  let isLoggedIn = false;
  const token = await AsyncStorage.getItem("@matchjobs");
  if (token) {
    const config = `bearer ${token}`;
    const response = await api
      .get("/user/me", {
        headers: {
          Authorization: config.split('"').join("")
        }
      })
      .then((res) => {
        if (res.status == 200) {
          isLoggedIn = true;
        }
      })
      .catch(() => {
        isLoggedIn = false;
      });
  }
  return isLoggedIn;
}

export { signIn, signUp, UpdateUser, DeleteUser, isLogged };
