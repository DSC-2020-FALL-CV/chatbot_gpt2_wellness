import React, { useState, useRef } from 'react';
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
	const listRef = useRef();
	const USER_MESSAGE = { isUser: true, name: userName, message: '' };
	const SIMSIMI_MESSAGE = { isUser: false, name: '제우스', message: '' };

	const [userInput, setUserInput] = useState('');
	const [messages, setMessages] = useState([]);

	const getMessageFromApi = (input) => {
		
		//our server ip : http://118.67.130.93:5000/message
		//http://10.0.2.2:5000/message
		return fetch('http://10.0.2.2:5000/message', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: input }),
		})
			.then((response) => response.json())
			.then((json) => {
				const userMessage = { ...USER_MESSAGE, message: input };
				const simsimiMessage = { ...SIMSIMI_MESSAGE, message: json.message };
				setMessages([...messages, userMessage, simsimiMessage]);
				return json.message;
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const onChangeInput = (text) => {
		setUserInput(text);
	};

	const onSubmitButtonClick = () => {
		const userMessage = userInput;
		setUserInput('');

		getMessageFromApi(userMessage);
	};

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
				ref={listRef}
				style={styles.list}
				data={messages}
				renderItem={renderItem}
				keyExtractor={(_, index) => index.toString()}
				onContentSizeChange={() => listRef.current.scrollToEnd({ animated: true })}
			/>
			<MessageInput
				input={userInput}
				onChangeInput={onChangeInput}
				onSubmiteButtonClick={onSubmitButtonClick}
			/>
		</View>
	);
};

export default ChatRoom;
