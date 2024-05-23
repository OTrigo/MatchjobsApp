import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  inputView:{
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  input:{
    width: '70%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: '2%',
  },
  edit:{
    alignSelf: 'center',
    marginStart: '2%',
    marginTop: '20%'
  },
  inputNotEditableView:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputNotEditable:{
    width: '70%',
    marginRight: '10%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: '2%',
  }
})