import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./styles";

export function ButtonNew({ size }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Entypo name="plus" size={size} color="#000" />
      </View>
    </View>
  );
}
