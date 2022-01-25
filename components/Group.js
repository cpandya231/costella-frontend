import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as groupService from '../services/GroupService'
import GroupList from "./GroupList";
import { withAuthenticator } from "aws-amplify-react-native";

const Group = (props) => {

  console.log('Inside Group container ' + props.user.username);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getGroups = async () => {
    try {

      let groupData = await groupService.getGroups(props.user.username);
      setData(groupData);
      setLoading(false);

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