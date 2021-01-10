import AsyncStorage from "@react-native-community/async-storage";

import axios from '../api';

export default async (payload) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
       headers: { "Authorization": `Bearer ${token}` }
    }
    const result = await (await axios.get(payload, headers)).data
    return result
}