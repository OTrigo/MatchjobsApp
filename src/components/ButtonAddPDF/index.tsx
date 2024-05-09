import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { DocumentPickerResult } from "expo-document-picker";
import { FontAwesome6 } from "@expo/vector-icons";

export default function ButtonAddPDF() {
  const [selectedPdf, setSelectedPDF] = useState<DocumentPickerResult | null>(null);
  useEffect(() => {
    
  }, [selectedPdf]);
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
    <View>
      <TouchableOpacity onPress={PickerPDF}>
        <Text>Escolher PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={RemovePDF}>
        <Text>
          <FontAwesome6 name="file-circle-xmark" size={24} color="red" />
        </Text>
      </TouchableOpacity>
      {selectedPdf?.assets &&( <Text>{selectedPdf.assets[0].name}</Text>)}
    </View>
  );
}
