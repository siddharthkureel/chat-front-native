import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Dimensions, KeyboardAvoidingView  } from 'react-native';
import { Input } from 'react-native-elements';

const { height, width } = Dimensions.get('window');

const SendMessage = ({ contactId: chatroom, userId, socket }) => {

    const [content, setContent] = useState('');
    socket.emit('join', { userId, chatroom }, (error) => {
        if (error) {

        }
    });

    useEffect(() => {
        //on recieving message
        socket.on('message', ({ userId, content, chatroom, createdAt }) => {
            // dispatch(sendMessage({
            //     chatroomId: contactId,
            //     userId,
            //     content,
            //     createdAt
            // }));
        });
        socket.open();
        return () => {
            socket.close();
        };
    },[socket]);

    const handleSubmit = () => {
        if(content===''){
            return
        }
        socket.emit('sendMessage', {
            chatroom,
            userId,
            content,
            createdAt: Date.now() 
        }, (error) => { console.log(error) })
        //cleaning the input box
        setContent('');
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ width: 300 }} >
                <Input
                    value={content}
                    onChangeText={setContent}
                />
            </View>
            <View>
                <Button onPress={handleSubmit} title="Send"/>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'red',
    }
})

export default SendMessage;
