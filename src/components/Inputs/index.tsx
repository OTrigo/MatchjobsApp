import { View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./styles";
import { SetStateAction, useState } from "react";

interface propsEdit {
  data: string;
  setChange: (text: string) => void;
}
interface propsNotEdit {
  data: string;
}
function InputEditable({ data, setChange }: propsEdit) {
  function switchIsEditable() {
    isEditable ? setIsEditable(false) : setIsEditable(true);
  }
  const [isEditable, setIsEditable] = useState(false);
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setChange}
        editable={isEditable}
      />
      <TouchableOpacity onPress={switchIsEditable}>
        <FontAwesome5
          name="edit"
          size={26}
          color="#037abe"
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
