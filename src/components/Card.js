import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'

import { Context as AuthContext } from '../context/AuthContext';

const Card = ({ contact, handleContact, i, navigation }) => {
    const { state } = useContext(AuthContext);
    const { email } = state.user
    const result = contact.users.filter((user)=>user.email!==email);
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('Chat', { contactId: contact._id })} >
            <ListItem key={i} bottomDivider >
                <ListItem.Content >
                    <ListItem.Title>{result[0].name}</ListItem.Title>
                    <ListItem.Subtitle>{result[0].email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    
)}

// onClick={() => handleContact(contact._id)}

export default Card;
