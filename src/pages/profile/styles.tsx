import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: "7%",
    flex: 1
  },
  loggout: {
    alignItems: "flex-end",
    paddingRight: "5%",
    marginTop: "3%"
  },
  inputs: {
    marginTop: "30%"
  },
  updateButton: {
    alignSelf: "center",
    backgroundColor: "#037abe",
    width: "70%",
    marginVertical: "3%",
    marginRight: "10%",
    borderRadius: 3,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  textButton: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold"
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderColor: "#037abe",
    borderWidth: 5,
    borderRadius: 3,
    alignItems: "center",
    width: "80%",
    height: "20%",
    alignSelf: "center",
    marginVertical: "75%",
    justifyContent: "space-between"
  },
  buttonContainer: {
    flexDirection: "row"
  }
});
