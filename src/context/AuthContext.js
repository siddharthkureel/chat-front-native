import AsyncStorage from "@react-native-community/async-storage";
import createContext from './createContext';
import api from '../api';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return {errorMessage: '', user: action.payload, isSignedIn: true, loading: false }
        case 'SIGNOUT':
            return {...state,  isSignedIn: false, loading: false }
        case 'ERROR':
            return {...state,  errorMessage: action.payload }
        case 'CLEAR_ERROR':
            return {...state,  errorMessage: '' }
        case 'NOUSER':
            return {...state, loading: false }
        default:
            return state
    }
}

const getUser = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token === '' || !token) {
        return dispatch({ type: 'NOUSER' })
    }
    const user = await (await api.get('/user', { headers: { "Authorization": `Bearer ${token}` } })).data
    dispatch({ type: 'SIGNIN', payload: user })
}

const clearErrorMessage = (dispatch) => () => dispatch({ type: 'CLEAR_ERROR' })

const signIn = (dispatch) => async ({ email, password }) => {
    try {
        const response = await api.post('/signin', { email, password });
        AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'SIGNIN', payload: response.data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: 'Invalid Credentials' })
    }
}

const signUp = (dispatch) => async ({ email, password, name }) => {
    try {
        const response = await api.post('/signup', { email, password, name });
        AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'SIGNIN', payload: response.data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: 'Something went wrong' })
    }
}

const signOut = (dispatch) => async () => {
    AsyncStorage.removeItem('token')
    dispatch({ type: 'SIGNOUT' })
}

export const { Context, Provider } = createContext(
    reducer,
    { signIn, signUp, clearErrorMessage, getUser, signOut },
    { isSignedIn: false, errorMessage: '', user: null, loading: true }
);