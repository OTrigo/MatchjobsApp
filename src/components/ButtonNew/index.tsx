import { View } from "react-native";
import { styles } from "./styles";

import { Entypo } from "@expo/vector-icons";

export function ButtonNew({ size }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Entypo name="plus" size={size} color="#000" />
      </View>
    </View>
  );
}
