import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import Spacer from '../components/Spacer';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
    const { signUp,state } = useContext(AuthContext);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false
        }) 
    }, [navigation]);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('blur', () => {
    //       clearErrorMessage()
    //     });
    
    //     return unsubscribe;
    // }, [navigation]);

    return (
        <Spacer style={styles.container}>
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                signup={true}
                onSubmit={signUp}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Spacer>
                <Text style={styles.link}>
                    Already have an account? Sign in instead
                </Text>
                </Spacer>
            </TouchableOpacity>
        </Spacer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 25,
    },
    link: {
        color: 'blue',
    },
});

export default SignupScreen;