import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { ChatRoom, User } from './src/components/Screens';

const Stack = createStackNavigator();

const screenOption = {
	headerShown: false,
};

// ========= [ constant variables ] =========================
// ==========================================================

const App = () => {
	const [userName, setUserName] = useState();

	const handleUserName = (text) => {
		setUserName(text);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="User">
				<Stack.Screen name="User" options={screenOption}>
					{({ navigation }) => (
						<User
							userName={userName}
							handleUserName={handleUserName}
							navigation={navigation}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name="ChatRoom">
					{() => <ChatRoom userName={userName} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
