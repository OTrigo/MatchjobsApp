import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  card: {
    width: screenWidth / 3,
    marginTop: "5%"
  },
  title: {
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    width: "100%"
  },
  video: {
    height: screenWidth / 2,
    borderRadius: 10
  }
});
