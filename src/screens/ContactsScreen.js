import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Card from '../components/Card';
import useGetRequest from '../hooks/useGetRequest';

const ContactsScreen = ({ handleContact=(id)=>console.log(id), navigation }) => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        (async() => {
            const result = await useGetRequest('/friends')
            setContacts(result)
        })()
    }, []);
    return (
        <View className="col-md-4" style={styles.container}>
            {
                contacts.map((contact, i)=>(
                    <Card 
                        key={i} 
                        i={i} 
                        contact={contact} 
                        handleContact={handleContact} 
                        navigation={navigation} 
                    />
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container : { 
        flex: 1,
        backgroundColor: '#f5f5f591' 
    },
    row: { 
        justifyContent: 'center', 
        alignContent: 'center' 
    }
})

export default ContactsScreen;
