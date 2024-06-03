import { AxiosRequestConfig } from "axios";
import { api } from "../infra/axios";
import Container, { Toast } from 'toastify-react-native';


interface pdfProps {
  userId: number;
  mimeType: string | undefined;
  name: string;
  size: number;
  uri: string;
}
async function UploadPDF(pdfFile: pdfProps, nameFile: string, userId:pdfProps ) {
  const FormData = global.FormData;
  const formdata = new FormData();
  formdata.append("file", {
    uri: pdfFile.uri,
    type: pdfFile.mimeType,
    name: pdfFile.name
  });
  const idString = userId.toString()
  formdata.append("nameFile", nameFile )
  formdata.append("userid", idString )
  const config: AxiosRequestConfig = {
    method: "post",
    url: "upload/",
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
    .then(()=>{
        Toast.success("Curriculo salvo com sucesso")
    })
    .catch((err) => {
        Toast.error("erro",'')
    });
    
}
export { UploadPDF };
