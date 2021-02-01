import React from 'react';
import { ScrollView, Text } from 'react-native';

const ChatRoom = ({ userName }) => {
	return (
		<ScrollView>
			<Text>사용자 이름</Text>
			<Text>{userName}</Text>
		</ScrollView>
	);
};

export default ChatRoom;
