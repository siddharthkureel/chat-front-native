import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Text, View, Button } from 'react-native';
import io from "socket.io-client";

import Chat from '../components/Chat';
import { Context as AuthContext } from '../context/AuthContext';

const ChatScreen = ({
    route,
}) => {
    const { state } = useContext(AuthContext);
    const { _id } = state.user;
    let { contactId } = route.params
    const [status, setStatus] = useState(false);
    const socket = io('https://029a4f4f2174.ngrok.io');
    socket.emit('active', { userId: _id }, () => { setStatus(true) });
    
    const handleContact = () => {
        console.log(status)
    }
    return(
    <View>
        <Chat socket={socket} userId={_id} contactId={contactId} />
    </View>
)};

export default ChatScreen;
