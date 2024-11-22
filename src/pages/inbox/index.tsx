import { View, Text, Image } from "react-native";
import { styles } from "./styles";

export default function Inbox() {
  return (
    <View
      style={styles.container}
      className="flex items-center justify-center bg-gray-900"
    >
      <Text className="color-white font-bold m-3 text-5xl">
        Em construção...
      </Text>
      <Image
        style={{ width: 300, height: 300 }}
        source={require("../../../assets/contructon.png")}
      ></Image>
    </View>
  );
}
