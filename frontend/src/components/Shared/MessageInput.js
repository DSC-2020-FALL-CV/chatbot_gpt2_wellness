import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'whitesmoke',
	},
	textInput: {
		flex: 1,
		paddingLeft: 3,
		fontSize: 18,
	},
});

// ========= [ constant variables ] =========================
const placeholder = '심심이에게 보낼 메시지를 입력하세요';
// ==========================================================

const MessageInput = () => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.textInput} placeholder={placeholder} />
			<IconButton name="send" size={40} color={Colors.black} />
		</View>
	);
};

export default MessageInput;
