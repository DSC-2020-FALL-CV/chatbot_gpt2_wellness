import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
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
	button: {
		height: 50,
		width: 50,
		backgroundColor: 'black',
	},
});

// ========= [ constant variables ] =========================
const placeholder = '제우스에게 보낼 메시지를 입력하세요';
// ==========================================================

const MessageInput = ({ input, onChangeInput, onSubmiteButtonClick }) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				placeholder={placeholder}
				value={input}
				onChangeText={onChangeInput}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={onSubmiteButtonClick}
			/>
			{/* <IconButton name="send" size={40} color={Colors.black} /> */}
		</View>
	);
};

export default MessageInput;
