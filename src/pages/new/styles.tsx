import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  camera: {
    width: "100%",
    height: "88%"
  },
  buttonContainer: {
    backgroundColor: "black",
    width: "100%",
    height: "12%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
});
