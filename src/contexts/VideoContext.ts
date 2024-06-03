import { AxiosError, AxiosRequestConfig } from "axios";
import { api } from "../infra/axios";
import { Toast } from "toastify-react-native";


interface VideoProps {
  mimeType: string | undefined;
  fileName: string;
  fileSize: number;
  uri: string;
}
async function UploadVideo(videoFile: VideoProps, nameFile: string, name:string, description:string, userId:string) {
  const FormData = global.FormData;
  const formdata = new FormData();
  formdata.append("file", {
    uri: videoFile.uri,
    type: videoFile.mimeType,
    name: videoFile.fileName
  });
 


  formdata.append("nameFile", nameFile )
  formdata.append("name", name )
  formdata.append("description", description )
  formdata.append("userId", userId )
  
  const config: AxiosRequestConfig = {
    method: "post",
    url: "upload-video/",
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data"

    },
    transformRequest: (data, headers) => {
      return formdata;
    },
    data: formdata
  };
  const response = await api.request(config)
  
    .then((response)=>{
        
        Toast.success("video salvo com sucesso")
    })
    .catch((error) => {

    });
    
}
export { UploadVideo };
