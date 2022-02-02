import { StyleSheet, View, Button } from "react-native";
import * as React from "react";
import { Auth } from "aws-amplify";

import Group from "./Group";
export default function Login({ navigation }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(async () => {
    const loggedInUser = await Auth.currentAuthenticatedUser();

    if (null == user) {
      setUser(loggedInUser);
    }
  });
  const signIn = () => {
    Auth.federatedSignIn({ provider: "Google" })
      .then((loggedInUser) => {
        setUser(loggedInUser);
        console.log(user);
      })
      .catch((err) => console.log("Error occured while signing in " + err));
  };

  if (null == user) {
    return (
      <View style={styles.container}>
        <Button onPress={() => signIn()} title="Open Google"></Button>
      </View>
    );
  } else {
    return <Group username={user.username} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
