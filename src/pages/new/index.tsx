import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import ButtonAddVideo from "../../components/ButtonAddVideo";
import { useState } from "react";

export default function New() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Titulo:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text style={styles.title}>Descrição</Text>
      <TextInput value={desc} onChangeText={setDesc} style={styles.input} />
      <ButtonAddVideo title={title} description={desc} />
    </View>
  );
}
