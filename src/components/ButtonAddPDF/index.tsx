import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { DocumentPickerResult } from "expo-document-picker";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./styles";
import { UploadPDF } from "../../contexts/PDFContext";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ButtonAddPDF() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPdf, setSelectedPDF] = useState<DocumentPickerResult | null>(
    null
  );
  useEffect(() => {}, [selectedPdf]);

  async function PickerPDF() {
    let result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false
    });
    if (result.assets && result.assets.length > 0) {
      setSelectedPDF(result);
    }
  }

  async function handleUploadPDF() {
    setIsLoading(true);

    const userData = await AsyncStorage.getItem("@matchjobs");
    const { id, name } = jwtDecode(userData);
    UploadPDF(selectedPdf?.assets[0], id + name, id).then(() => {
      setIsLoading(false);
    });
    setIsLoading(false);
  }
  function RemovePDF() {
    setSelectedPDF(null);
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonAdd} onPress={PickerPDF}>
          <Text style={styles.textWhite}>Escolher PDF</Text>
        </TouchableOpacity>
        {selectedPdf?.assets && (
          <TouchableOpacity style={styles.buttonAdd} onPress={handleUploadPDF}>
            <Text style={styles.textWhite}>Enviar pdf</Text>
          </TouchableOpacity>
        )}
      </View>

      {selectedPdf?.assets && (
        <View style={styles.containerContent}>
          <View style={styles.viewText}>
            <Text
              style={styles.textWhite}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {selectedPdf.assets[0].name}
            </Text>
          </View>
          <TouchableOpacity style={styles.deleteFile} onPress={RemovePDF}>
            <FontAwesome6 name="file-circle-xmark" size={26} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
