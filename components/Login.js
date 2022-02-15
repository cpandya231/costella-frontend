import { StyleSheet, View, Button,Image,Text,TouchableHighlight } from "react-native";
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
        <TouchableHighlight style={styles.signinButton}>
        <Text>Sign in with Google</Text>
        </TouchableHighlight>
      {/* <Button onPress={() => signIn()} title="Open Google"></Button> */}
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
  signinButton:{
    width:245,
    height:49,
    borderWidth:1,
    shadowOffset: {
              width: 10,
              height: 10
            },
    shadowRadius:1,        
    borderRadius:20,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
      elevation: -5
  }
});
