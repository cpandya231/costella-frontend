import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as groupService from '../services/GroupService'
import GroupList from "./GroupList";
import AddButton from "./AddButton";
import { useNavigation } from '@react-navigation/native';
import { Auth } from "aws-amplify";
import CustomText from "./CustomText";
import CustomHeader from "./CustomHeader";

const Group = (props) => {
  let username = props.username;
  let groups = [];
  if (null != props.route.params) {
    username = props.route.params.username;
    groups = props.route.params.groups;
  }
  console.log('Inside Group container ');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(groups);
  let navigation = useNavigation();

  const getGroups = async () => {
    try {
      const loggedInUser = await Auth.currentAuthenticatedUser();
      username = loggedInUser.username;
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

      {isLoading ? <CustomText>Loading Groups...</CustomText> :
        <View style={styles.listContainer}>
          <CustomHeader>My Groups</CustomHeader>
          <GroupList data={data} />
          <AddButton onPress={() => addGroup()} name="Add Group" style={{
            position: "absolute",
            right: 26,
            bottom: 33
          }}></AddButton>
        </View>
      }

    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 5,
    backgroundColor: "#fff",

  }
});

export default Group;