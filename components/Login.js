import { StyleSheet, View, Button, Image, Text, TouchableHighlight, TouchableNativeFeedback } from "react-native";
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
      <Image
        source={require("../assets/getting-started.png")}
        style={{ height: 309, width: 329 }}
      />
      <TouchableNativeFeedback style={styles.signinButton} onPress={() => signIn()}

      >
        <View style={styles.signinButtonView}>
          <Image
            source={require("../assets/Google.png")}
          />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sign in with Google</Text>
        </View>
      </TouchableNativeFeedback>
      {/* <Button onPress={() => signIn()} title="Open Google"></Button> */}
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  signinButton: {
    justifyContent: "center",

  },
  signinButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    width: 245,
    height: 49,
    marginTop: 83,

  }

});
