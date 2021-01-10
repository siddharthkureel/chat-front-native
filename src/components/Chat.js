import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import moment from 'moment';

import SendMessage from './SendMessage';
import useGetRequest from '../hooks/useGetRequest';

const { height, width } = Dimensions.get('window');

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        (async() => {
            const result = await useGetRequest(`/messages/${props.contactId}`)
            setMessages(result)
        })()
    }, []);
    console.log(props.userId, messages)
    return (
        <View>
            <View style={styles.row} >
                <View style={styles.chat}>
                    <View style={styles.main}>
                        {messages === '' ?
                            <Text>Say hi, to begin with conversation</Text>
                            :
                            <FlatList
                                data={messages}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item })=>{
                                    return <View style={props.userId===item.userId ? styles.pullRight: styles.pullLeft } >
                                            <View style={styles.card} >
                                                <Text style={styles.content} >{String(item.content)}</Text>
                                                <Text style={styles.date}>{moment(item.createdAt).calendar()}</Text>
                                            </View>
                                        </View>
                                }}
                            />
                        }
                    </View>
                    <SendMessage {...props} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { height: 100 },
    chat: {
        display: 'flex',
        width: 100
    },
    main: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        margin: 20,
        padding: 10,
        width: width,
        height: height/2
    },
    pullRight: {
        alignSelf: 'flex-end',
        marginRight: 40
    },
    pullLeft: {
        alignSelf: 'flex-start'
    },
    card: {
        marginVertical: 10
    },
    date: {
        color: 'grey'
    },
    content: {
        fontSize: 20
    }
})
export default Chat;
