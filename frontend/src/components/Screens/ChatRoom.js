import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Message, MessageInput } from '../Shared';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	list: {
		padding: 20,
	},
});

const ChatRoom = ({ userName }) => {
	const DATA = [
		{ isUser: true, name: userName, message: '안녕?' },
		{ isUser: false, name: '심심이', message: '안녕!' },
	];

	const renderItem = ({ item }) => {
		return (
			<Message
				isUser={item.isUser}
				name={item.name}
				message={item.message}
			/>
		);
	};

	

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.list}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(_, index) => index.toString()}
			/>
			<MessageInput />
		</View>
	);
};

export default ChatRoom;
