import { AxiosError, AxiosRequestConfig } from "axios";
import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { navigate } from "./NavigationContext";


interface VideoProps {
  mimeType: string | undefined;
  fileName: string;
  fileSize: number;
  uri: string;
}
interface postProps{
  title: string;
  description: string;
  setTitle:(newTitle: string) => void ;
  setDescription: (newDescription: string) => void;
}
async function createPost({title, description, setTitle, setDescription}:postProps){

  const token = await AsyncStorage.getItem("@matchjobs");
  const config = `bearer ${token}`;
  const id = jwtDecode(token ?? '');
  if(title != '' && description != ''){
    const result = await api.post(
      '/post',
      {
        title: title,
        description: description,
        userId: id.id
      },
      {
        headers: {
          Authorization: config.split('"').join("")
        }
      }
    ).then(async (response) =>{
      await AsyncStorage.setItem('@idVideo',response.data.id).then(()=>{
        navigate('PostVideo')
      })
      setDescription('');
      setTitle('');
    }).catch((err)=>{
      console.log(err)
    })
  }
}
async function UploadVideo(videoFile: VideoProps) {
  const token = await AsyncStorage.getItem("@matchjobs");
  const config = `bearer ${token}`;
  const idVideo = await AsyncStorage.getItem('@idVideo');
  const FormData = global.FormData;
  const formdata = new FormData();
  formdata.append("file", {
    uri: videoFile.uri,
    type: videoFile.mimeType,
    name: videoFile.fileName
  });
  await api.post(`upload/uploadVideo/${idVideo}`,
    formdata, {
      headers: {
        Authorization: config.split('"').join(""),
        'Content-Type': 'multipart/form-data',
  }}).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err.request.response)
  })
  
  // const config: AxiosRequestConfig = {
  //   method: "post",
  //   url: `upload/uploadVideo/${idVideo}`,
  //   responseType: "json",
  //   auth: configAuth.,
  //   headers: {
  //     "Content-Type": "multipart/form-data"

  //   },
  //   transformRequest: (data, headers) => {
  //     return formdata;
  //   },
  //   data: formdata
  // };
  // const response = await api.request(config)
  
  //   .then((response)=>{
  //       console.log(response)
  //       alert("video salvo com sucesso")
  //   })
  //   .catch((error) => {
  //     console.log(error)

  //   });
    
}
export { UploadVideo, createPost };
