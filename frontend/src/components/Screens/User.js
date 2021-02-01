import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { checkIsStringEmpty } from '../function/FunctionaManger';

const styles = StyleSheet.create({
	cotainer: {
		flex: 1,
		backgroundColor: '#F9F9F9',
	},
	title: {
		fontSize: 40,
	},
	input: {
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 1,
	},
	button: {
		backgroundColor: '#FFE0AC',
	},
});

// ========= [ constant variables ] =========================
const title = '사용자 이름 입력하기';
const userNameInputPlaceholder = '사용자 이름을 입력하세요';
const setUserNamebuttonText = '설정하기';
// ==========================================================

const User = ({ userName, handleUserName, navigation }) => {
	const isUserNameEmpty = checkIsStringEmpty(userName);

	const onSetUserNameButtonClick = () => {
		navigation.navigate('ChatRoom');
	};

	return (
		<View style={styles.cotainer}>
			<Text style={styles.title}>{title}</Text>
			<Text>{userName}</Text>
			<TextInput
				style={styles.input}
				onChangeText={handleUserName}
				value={userName}
				placeholder={userNameInputPlaceholder}
			/>
			<Button
				color={styles.button.backgroundColor}
				title={setUserNamebuttonText}
				onPress={onSetUserNameButtonClick}
				disabled={isUserNameEmpty}
			/>
		</View>
	);
};

export default User;
