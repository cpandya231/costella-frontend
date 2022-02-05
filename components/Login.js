import { StyleSheet, View, Button } from "react-native";
import * as React from "react";
import { Auth } from "aws-amplify";

export default function Login({ navigation }) {

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then(loggedInUser => {
      navigation.navigate("TabNavigator");
    }).catch(err => {
      console.log("User has not logged in")
    });

  });
  const signIn = () => {
    Auth.federatedSignIn({ provider: "Google" })
      .then((loggedInUser) => {
        console.log(loggedInUser);
      })
      .catch((err) => console.log("Error occured while signing in " + err));
  };


  return (

    <View style={styles.container}>
      <Button onPress={() => signIn()} title="Open Google"></Button>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
