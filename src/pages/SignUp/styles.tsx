import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: 230,
    height: 230,
    alignSelf: "center"
  },
  input: {
    width: "80%",
    height: 40,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: 5
  },
  submit: {
    width: "50%",
    height: 40,
    backgroundColor: "#017bbed9",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 20
  },
  textcenter: {
    textAlign: "center",
    color: "white"
  },
  Link: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: "7%"
  },
  label: {
    marginLeft: "10%",
    fontSize: 15,
    fontWeight: "bold"
  }
});
