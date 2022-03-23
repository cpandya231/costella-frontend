import { StyleSheet, Text, View, Button, Image, TouchableNativeFeedback } from "react-native";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import CustomText from "./CustomText";
import Arrow from "../assets/RightArrow-red.svg"

export default function Settings() {

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: ""
  })
  const logout = () => {
    Auth.signOut()
  };

  useEffect(() => {

    Auth.currentAuthenticatedUser().then(loggedInUser => {
      profile["name"] = loggedInUser.attributes.name;
      setProfile(profile);
      setLoading(false);
    }).catch(err => {
      console.log("User has not logged in")
    });

  });


  return (<View style={styles.container}>
    {isLoading ? <CustomText></CustomText> : <View style={styles.container}>
      <View style={{}}>
        <View style={{ backgroundColor: "#C4C4C4", borderRadius: 50, height: 74, width: 74, alignSelf: "center", justifyContent: "center" }}>
          <CustomText style={styles.text}>{profile.name.charAt(0)}</CustomText>
        </View>
        <CustomText style={styles.text}>{profile.name}</CustomText>
      </View>

      <TouchableNativeFeedback onPress={logout} >
        <View style={styles.logoutButton}>
          <Image source={require("../assets/Logout.png")}
            style={{ height: 33, width: 38 }} />
          <View style={{ flexDirection: "row", alignItems: "center", height: 33, width: "90%", justifyContent: "space-between" }}>
            <CustomText style={{ color: "red", textAlign: "center" }}>Logout</CustomText>
            <Arrow />
          </View>

        </View>
      </TouchableNativeFeedback>

    </View>
    }

  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,


  },
  text: {
    textAlign: "center", fontSize: 24
  },
  logoutButton: {
    marginTop: 41,
    flexDirection: "row",
    borderWidth: 1,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignSelf: "baseline",
    padding: 10,
    borderColor: `red`

  }
});
