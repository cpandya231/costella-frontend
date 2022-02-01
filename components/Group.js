import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as groupService from '../services/GroupService'
import GroupList from "./GroupList";
import AddButton from "./AddButton";
import { useNavigation } from '@react-navigation/native';

const Group = (props) => {
  let username = props.username;
  let groups = [];
  if (null != props.route) {
    username = props.route.params.username;
    groups = props.route.params.groups;
  }
  console.log('Inside Group container ');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(groups);
  let navigation = useNavigation();

  const getGroups = async () => {
    try {

      let groupData = await groupService.getGroups(username);
      setData(groupData);
      setLoading(false);

    } catch (error) {
      console.error(error);
    } finally {

    }
  }

  const addGroup = () => {

    navigation.navigate("AddGroupForm", { "username": username, "groups": data });

  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>

      {isLoading ? <Text>Loading Groups...</Text> :
        <View style={styles.listContainer}>
          
          <GroupList data={data} />
          <AddButton onPress={() => addGroup()} />
        </View>
      }

    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 5,
    backgroundColor: "#f8f8f8",

  }
});

export default Group;