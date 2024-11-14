import { AxiosRequestConfig } from "axios";
import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

interface pdfProps {
  mimeType: string | undefined;
  name: string;
  size: number;
  uri: string;
}
async function UploadPDF(pdfFile: pdfProps) {
  const token = await AsyncStorage.getItem("@matchjobs");
  const code = `bearer ${token}`;
  const FormData = global.FormData;
  const formdata = new FormData();
  formdata.append("file", {
    uri: pdfFile.uri,
    type: pdfFile.mimeType,
    name: pdfFile.name
  });
  const config: AxiosRequestConfig = {
    method: "post",
    url: `/upload/uploadPdf`,
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": code.split('"').join("")
    },
    transformRequest: (data, headers) => {
      return formdata;
    },
    data: formdata
  };
  console.log('config'+JSON.stringify(config))
  const response = await api
    .request(config)
    .then(() => {
      showMessage({
        message: "curriculo atualizado",
        type: "success"
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
export { UploadPDF };
