import React, { useContext } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = ({
    navigation
}) => {
    const { state, signOut } = useContext(AuthContext);
    
    return(
        <View style={styles.container} >
            <View>
                <Text style={styles.name} >Welcome</Text>
                <Text style={styles.name} >{state.user.email}</Text>
            </View>
            <View style={{ margin: 20 }} >
                <Button title="SignOut" onPress={signOut} />
            </View>
        </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    name: {
        fontSize: 20,
        textAlign: 'center'
    },
    link: {
        color: 'blue',
        marginHorizontal: 20
    },
});

export default AccountScreen;
