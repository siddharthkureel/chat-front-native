import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button, Input, SearchBar } from 'react-native-elements';
import AddList from '../components/AddList';
import useGetRequest from '../hooks/useGetRequest';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const validate = (value) => {
        let valid = /\S+@\S+\.\S+/.test(String(value).toLowerCase().trim());
        if (!valid) {
            setError('Please enter valid email')
        } else {
            setError('')
        }
        setQuery(value)
    }

    const handleSubmit = async () => {
        let value = String(query).toLowerCase().trim()
        const data = await useGetRequest(`/search/${value}`);
        setResult(data)
    }

    return (
        <View className="container" style={styles.container}>
            <View style={styles.row} >
                <View style={styles.profile} >
                    <TextInput 
                        value={query} 
                        onChangeText={validate} 
                        placeholder="enter email" 
                        style={styles.textInput}
                        s
                    />
                    <Button title="Submit" onPress={handleSubmit} />
                </View>
                <Text style={styles.error} >{error}</Text>
                <AddList result={result} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,  
        backgroundColor: '#f5f5f591' 
    },
    row: { 
        marginTop: 20
    },
    profile: { 
        flexDirection: 'row',
        margin: 20
    },
    textInput: {
        flex: 1,
        height: 40,
        borderBottomColor: 'grey',
        borderWidth: 1,
        paddingRight: 10,
        paddingLeft: 10
    },
    error: {
        color: 'red',
        margin: 20
    }
})

export default SearchScreen;
