import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import usePostRequest from '../hooks/usePostRequest';

const AddList = ({ result }) => {
    const [disabled, setDisabled] = useState(false)
    const handleSubmit = async() => {
        try {
            setDisabled(true)
            await usePostRequest('/request', result);
        } catch (error) {
            console.log(error)
        }
    }
    if(typeof result === 'string'){
        return <View>
            <Text>{result}</Text>
        </View>
    }
    return (
        <View style={styles.container} elevation={3} >
            <Text style={styles.text} >{result.email}</Text>
            <Text>{
                result.chatroom===undefined ? 
                <Button disabled={disabled} onPress={()=>handleSubmit()} title="Add Connection" />
                : 
                result.chatroom[0].status}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        marginBottom: 20
    }
})

export default AddList;
