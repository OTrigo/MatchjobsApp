import { View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./styles";
import { SetStateAction, useState } from "react";

interface propsEdit {
  data: string;
  setChange: (text: string) => void;
  isPassword: boolean;
}
interface propsNotEdit {
  data: string;
}
function InputEditable({ data, setChange, isPassword }: propsEdit) {
  function switchIsEditable() {
    isEditable ? setIsEditable(false) : setIsEditable(true);
  }
  const [isEditable, setIsEditable] = useState(false);
  return (
    <View className="flex flex-row justify-center">
      <TextInput
        className="w-8/12 border-solid pl-3 border color-white border-white h-10 rounded-md  placeholder:italic placeholder:text-slate-400 mt-2 mb-2 mr-2"
        value={data}
        style={{ borderColor: isEditable ? "#2763eb" : "white" }}
        onChangeText={setChange}
        editable={isEditable}
        secureTextEntry={isPassword}
        placeholder="******"
      />
      <TouchableOpacity onPress={switchIsEditable}>
        <FontAwesome5
          name="edit"
          size={26}
          color="#2763eb"
          style={styles.edit}
        />
      </TouchableOpacity>
    </View>
  );
}
function InputNotEditable({ data }: propsNotEdit) {
  return (
    <View style={styles.inputNotEditableView}>
      <TextInput
        style={styles.inputNotEditable}
        value={data}
        editable={false}
      />
    </View>
  );
}
export { InputEditable, InputNotEditable };
