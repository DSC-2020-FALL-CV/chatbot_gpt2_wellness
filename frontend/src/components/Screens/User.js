import React from 'react';

import {
	StyleSheet,
	View,
	Text,
	TextInput,
	SafeAreaView,
	BackHandler,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image
} from 'react-native';
import { checkIsStringEmpty } from '../function/FunctionaManger';

// ========= [ constant color ] =========================
const inputTextColor = '#e6e3e3';
const buttonColor = '#fb5b5a';
const TextColor = '#003f5c';
const backgroundColor = 'white';
const inputText = 'black';
// ==========================================================

// ========= [ constant variables ] =========================
const title = '[ 제우스 ]';
const userNameInputPlaceholder = '사용자 이름을 입력해주세요';
const dummyVal = '김위로';
const setUserNamebuttonText = '시작하기';
const exit = '종료하기';
// ==========================================================

const User = ({ userName, handleUserName, navigation }) => {
	const isUserNameEmpty = checkIsStringEmpty(userName);

	const onSetUserNameButtonClick = () => {
		navigation.navigate('ChatRoom');
	};

	const onSetExitButtonClick = () => {
		BackHandler.exitApp();
	};

	return (
		<SafeAreaView style={styles.wrap}>
			<View style={styles.container}>
				
			<KeyboardAvoidingView style={styles.inputView}>
				<Text style={styles.title}>{title}</Text>
					

					<Image 
					style = {styles.iconImage}
					source={require("../assets/zeus.png")}
					/>

					<Text style={styles.descriptionText}>
						{userNameInputPlaceholder}
					</Text>
					<TextInput
						style={styles.inputText}
						onChangeText={handleUserName}
						value={userName}
						placeholder={dummyVal}
					/>
				<View style={styles.buttonView}>
					<TouchableOpacity
						style={styles.button}
						onPress={onSetUserNameButtonClick}
						disabled={isUserNameEmpty}
					>
						<Text style={styles.buttonText}>
							{setUserNamebuttonText}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={onSetExitButtonClick}
					>
						<Text style={styles.buttonText}>{exit}</Text>
					</TouchableOpacity>
				</View>

				</KeyboardAvoidingView>		
			</View>
		</SafeAreaView>
	);
};

export default User;

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: backgroundColor,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 50,
		color: TextColor,
		marginBottom: 20,
	},

	inputView: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	inputText: {
		width: '70%',
		backgroundColor: inputTextColor,
		borderRadius: 25,
		fontWeight: 'bold',
		height: 50,
		fontSize: 20,
		textAlign: 'center',
		color: inputText,
	},

	iconImage: {
		height: '40%',
		width: '40%',
		resizeMode : 'contain',
		borderRadius: 20,
	},

	descriptionText: {
		textAlign: 'center',
		color: TextColor,
		fontSize: 15,
		marginBottom: 5,
		
		marginTop: 20
	},

	buttonView: {
		width: '70%',
		justifyContent: 'space-between',
		marginTop: 10,
		flexDirection : 'row',
	},
	button: {
		backgroundColor: buttonColor,
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		padding : 20,
	},

	buttonText: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 20,
	},

	
});
