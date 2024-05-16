import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { DocumentPickerResult } from "expo-document-picker";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./styles";

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
    }
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
        <TouchableOpacity style={styles.deleteFile} onPress={RemovePDF}>
          <Text>
            <FontAwesome6 name="file-circle-xmark" size={26} color="red" />
          </Text>
        </TouchableOpacity>
      </View>

      {selectedPdf?.assets && (
        <View style={styles.viewText}>
          <Text style={styles.textWhite} numberOfLines={1} ellipsizeMode="tail">
            {selectedPdf.assets[0].name}
          </Text>
        </View>
      )}
    </>
  );
}
