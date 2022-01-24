import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as constants from '../constants/constants';
import GroupList from "./GroupList";
import { withAuthenticator } from "aws-amplify-react-native";

const Group = (props) => {

  console.log('Inside Group container ' + props.user.username);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const url = constants.BASE_URL + 'group/' + props.user.username;
  const JWT_TOKEN = props.user.signInUserSession.accessToken.jwtToken;

  const getGroups = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: JWT_TOKEN
        }
      });
      console.log('Got response from Groups api ' + JSON.stringify(response));
      if (response.status == 200) {
        const groupData = await response.json();
        setData(groupData);
        setLoading(false);
      } else {
        console.error(response.status);
      }


    } catch (error) {
      console.error(error);
    } finally {

    }
  }


  useEffect(() => {
    getGroups();
  }, []);

  return (

    <View style={styles.listContainer}>
      {isLoading ? <Text>Loading Groups...</Text> :
        <GroupList data={data} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 5,
    backgroundColor: "#FFFDDE",

  }
});

export default withAuthenticator(Group);