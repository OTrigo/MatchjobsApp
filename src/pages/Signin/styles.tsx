import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        flex:1,
    },
    logo:{
        width: 300,
        height: 300,
        alignSelf: 'center'
    },
    input:{
        width:'80%',
        height: 40,
        borderStyle: 'solid',
        borderRadius: 4,
        borderWidth: 2,
        alignSelf: 'center',
        marginVertical: 20

    },
    submit:{
        width: "50%",
        height: 40,
        backgroundColor: '#017bbed9',
        alignSelf: 'center',
        borderRadius: 4
    },
    textecenter:{
        marginTop: '5%',
        textAlign: 'center',
        color:'white'
    }
})
