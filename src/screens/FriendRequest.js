import React, { useEffect, useState, useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

import useGetRequest from '../hooks/useGetRequest';
import { Context as AuthContext } from '../context/AuthContext';

const FriendRequest = () => {
    const [requests, setRequests] = useState([]);
    const { state } = useContext(AuthContext);
    useEffect(() => {
        (async () => {
            const results = await useGetRequest('/friend-request');
            setRequests(results)
            })();
    }, []);
    const handleSubmit = async (request) => {
        const response = await useGetRequest(`/accepted/${request._id}`);
        console.log(response)
    }
    return (
        <View>
            {
                requests.length===0 ? <Text>No request</Text> :
                requests.map((request, i)=>{
                    const result = request.users.filter((user)=>user.email!==state.user.email)
                        return(
                        <View key={i} style={styles.container} elevation={3} >
                            <Text style={styles.text} >{result[0].email}</Text>
                            <View>{request.status==='pending' &&
                                <Button onPress={()=>handleSubmit(request)} title="Accept" /> }
                            </View>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 20
    }
})

export default React.memo(FriendRequest);
