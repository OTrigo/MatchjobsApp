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
    marginTop: "15%"
  },
  updateButton: {
    alignSelf: "center",
    borderColor: "#037abe",
    borderWidth: 2,
    width: "30%",
    marginVertical: "3%",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  textButton: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold"
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "50%",
    paddingHorizontal: "7%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  updateModalButton: {
    alignSelf: "center",
    backgroundColor: "#037abe",
    width: "70%",
    marginVertical: "3%",
    marginRight: "10%",
    borderRadius: 3,
    padding: 5,
    paddingHorizontal: "10%"
  },
  closeIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    marginVertical: "2%",
    right: "3%"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  videosContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderTopWidth: 3,
    borderColor: "#037abe"
    // paddingTop: "20%"
  }
});
