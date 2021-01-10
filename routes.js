import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { MaterialCommunityIcons, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'; 

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import AccountScreen from './src/screens/AccountScreen';
import SearchScreen from './src/screens/SearchScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import ChatScreen from './src/screens/ChatScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import FriendRequestScreen from './src/screens/FriendRequest';

function getHeaderTitle(route) {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Contacts';
  
	switch (routeName) {
	case 'Contacts':
		return 'Contacts';
	case 'Account':
		return 'Account';
	case 'Search':
		return 'Search';
	case 'FriendRequest':
		return 'FriendRequest';
	}
}

const AuthStack = createStackNavigator()
 
export const AuthStackScreen = () => {
  return(
  <AuthStack.Navigator>
    <AuthStack.Screen  name="Signin" component={SigninScreen} />
    <AuthStack.Screen  name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
)}
const AppStack = createBottomTabNavigator()
 
const HomeTabs = ({ navigation, route }) => {
	React.useLayoutEffect(() => {
	  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
	}, [navigation, route]);
	return(
		<AppStack.Navigator tabBarOptions={{ activeTintColor: '#e91e63' }}>
			<AppStack.Screen name="Contacts" component={ContactsScreen} options={{ 
					tabBarIcon: ({ focused }) => (
						<AntDesign name="contacts" size={24} color={focused ? "#e91e63" : "grey"} />
					)
				}} 
			/>
			<AppStack.Screen name="Search" component={SearchScreen} options={{ 
					tabBarIcon: ({ focused }) => (
						<FontAwesome5 name="search" size={24} color={focused ? "#e91e63" : "grey"} />
					),
				}} 
			/>
			<AppStack.Screen name="FriendRequest" component={FriendRequestScreen} options={{ 
					tabBarIcon: ({ focused }) => (
						<FontAwesome5 name="user-friends" size={24} color={focused ? "#e91e63" : "grey"} />
					),
				}} 
			/>
			<AppStack.Screen name="Account" component={AccountScreen} options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons name="account" size={24} color={focused ? "#e91e63" : "grey"} />
					),
				}} 
			/>
		</AppStack.Navigator>
)}

const Stack = createStackNavigator()
export const AppStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} />
		<Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
)

const Loading = createStackNavigator();
export const ResolveScreen = () => {
  return(
  <Loading.Navigator>
    <Loading.Screen  name="loading" component={LoadingScreen} />
  </Loading.Navigator>
)}
