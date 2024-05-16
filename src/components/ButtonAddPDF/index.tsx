import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { DocumentPickerResult } from "expo-document-picker";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./styles";
import { UploadPDF } from "../../contexts/PDFContext";

export default function ButtonAddPDF() {
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
      console.log(selectedPdf);
    }
  }

  function handleUploadPDF() {
    UploadPDF(selectedPdf?.assets[0]);
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
