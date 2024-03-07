import { View, Text } from "react-native";
import {
  GoogleSignin,
  // eslint-disable-next-line
  GoogleSigninButton,
  // eslint-disable-next-line
  statusCodes
} from "@react-native-google-signin/google-signin";

import { styles } from "./styles";

interface SignInProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

GoogleSignin.configure({});

export default function SignIn({ setLogin }: SignInProps) {
  // eslint-disable-next-line
  console.log(setLogin);
  return (
    <View style={styles.container}>
      <Text>Página de Sign-in</Text>
    </View>
  );
}
