import { AxiosRequestConfig } from "axios";
import { api } from "../infra/axios";


interface pdfProps {
  mimeType: string | undefined;
  name: string;
  size: number;
  uri: string;
}
async function UploadPDF(pdfFile: pdfProps, nameFile: string) {
  const FormData = global.FormData;
  const formdata = new FormData();
  formdata.append("file", {
    uri: pdfFile.uri,
    type: pdfFile.mimeType,
    name: pdfFile.name
  });
  formdata.append("nameFile", nameFile )
  console.log(formdata)
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
        alert("Curriculo salvo com sucesso")
    })
    .catch((err) => {
      console.error(err);
    });
    
}
export { UploadPDF };
