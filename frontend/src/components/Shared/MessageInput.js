import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#e6e3e3',
		marginTop : 20,
	},
	textInput: {
		flex: 1,
		paddingLeft: 3,
		fontSize: 18,
		marginLeft : 10,
	},
	buttonImage: {
		height: 42,
		width: 42,
		margin: 4,
		resizeMode : 'contain',
		borderRadius: 20,
	}
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
				onChangeText={onChangeInput}/>

			<TouchableOpacity
				onPress={onSubmiteButtonClick}>
			<Image 
			
			style = {styles.buttonImage}
			source={require("../assets/send.png")}
			/>

			</TouchableOpacity>
		</View>
	);
};

export default MessageInput;
