import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { DocumentPickerResult } from "expo-document-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ButtonAddPDFProps {
  selectedPdf: DocumentPickerResult | null;
  setSelectedPDF: (pdf: DocumentPickerResult | null) => void;
}

export default function ButtonAddPDF({
  selectedPdf,
  setSelectedPDF
}: ButtonAddPDFProps) {
  const [namePdf, setNamePdf] = useState<string | null>(null);
  useEffect(() => {
    async function getPortifolioName() {
      const portifolio = await AsyncStorage.getItem("@portifolio1");
      console.log(portifolio);
      setNamePdf(portifolio);
    }
    getPortifolioName();
  }, []);

  async function PickerPDF() {
    const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false
    });

    if (result.assets && result.assets.length > 0) {
      setSelectedPDF(result);
      setNamePdf(result?.assets[0].name);
      await AsyncStorage.setItem("@portifolio1", result?.assets[0].name);
    }
  }

  function RemovePDF() {
    setSelectedPDF(null);
  }
  return (
    <>
      {(namePdf || selectedPdf) && (
        <View className="flex flex-row items-center justify-center max-w-4xl mt-3">
          <View className="self-center justify-self-center w-3/6 bg-blue-500 p-1 rounded-md">
            <Text
              className="text-center color-white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {namePdf}
            </Text>
          </View>
          {selectedPdf && (
            <TouchableOpacity
              className="h-9 self-center w-10 ml-4 rounded-md bg-red-500 items-center justify-center"
              onPress={RemovePDF}
            >
              <MaterialIcons name="highlight-remove" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View className="items-center flex-row justify-around w-12/12 self-center">
        <TouchableOpacity
          className="h-9 self-center w-60 rounded-md bg-blue-600 flex-row items-center mt-5 justify-center"
          onPress={PickerPDF}
        >
          <Text className="color-white">Escolher Arquivo</Text>
          <Text className="text-center color-white">
            <MaterialIcons name="upload-file" size={27} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
