
import Amplify, { Auth, Hub } from "aws-amplify";
import * as constants from '../constants/constants';

let url = constants.BASE_URL + 'group/';


export const getGroups = async () => {
    const JWT_TOKEN = await getAccessJwtToken();
    let username = await getUserName();

    const response = await fetch(url + username, {
        method: 'GET',
        headers: {
            Authorization: JWT_TOKEN
        }
    });

    if (response.status == 200) {
        const groupData = await response.json();
        console.log('Group data from service ' + JSON.stringify(groupData));
        return groupData;
    } else {
        console.error("Error occured " + response.status);
        return null;
    }

}

export const addGroup = async (body) => {
    console.log("Adding Group using " + JSON.stringify(body));
    const JWT_TOKEN = await getAccessJwtToken();
    let username = await getUserName();
    const response = await fetch(url + username, {
        method: 'POST',
        headers: {
            Authorization: JWT_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.status == 200) {
        const groupData = await response.json();
        console.log('Group data from service ' + JSON.stringify(groupData));
        return groupData;
    } else {
        console.error("Error occured " + response.status);
        return null;
    }

}


export const getGroupItem = async (groupId, createdDate, searchBy) => {
    const JWT_TOKEN = await getAccessJwtToken();
    let itemUrl = `${url}item/${groupId}?createdDate=${createdDate}&searchBy=${searchBy}`;

    const response = await fetch(itemUrl, {
        method: 'GET',
        headers: {
            Authorization: JWT_TOKEN
        }
    });

    if (response.status == 200) {
        const itemData = await response.json();

        return itemData;
    } else {
        console.log(response)
        console.error(response.status);
        return null;
    }

}

export const addGroupItem = async (body) => {
    console.log("Adding item to using " + JSON.stringify(body));
    const JWT_TOKEN = await getAccessJwtToken();
    let itemUrl = url + 'item';
    console.log("Item url " + itemUrl);
    const response = await fetch(itemUrl, {
        method: 'POST',
        headers: {
            Authorization: JWT_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.status == 200) {
        const itemData = await response.json();
        console.log('Got response from Items api after adding item  ' + JSON.stringify(itemData));
        return itemData;
    } else {
        console.error(response.status);
        return null;
    }

}

const getAccessJwtToken = async () => {
    // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
    const session = await Auth.currentSession();

    return session.getAccessToken().getJwtToken();
};

const getUserName = async () => {
    const loggedInUser = await Auth.currentAuthenticatedUser();
    return loggedInUser.username;

}