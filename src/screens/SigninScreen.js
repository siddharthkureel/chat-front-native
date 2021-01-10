import React, { useContext, useLayoutEffect, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';
import AuthForm from '../components/AuthForm';

const SigninScreen = ({ navigation }) => {
    const { state, signIn } = useContext(AuthContext);
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
    //   }, [navigation]);
    return (
        <Spacer style={styles.container}>
            <AuthForm
                headerText="Sign In for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signIn}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Spacer>
                    <Text style={styles.link}>
                        Don't have an account? Sign up instead
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

export default SigninScreen;