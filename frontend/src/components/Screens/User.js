import React from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, BackHandler, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { checkIsStringEmpty } from '../function/FunctionaManger';

// ========= [ constant color ] =========================
const inputTextColor = "#465881";
const buttonColor = "#fb5b5a";
const TextColor = "white";
const backgroundColor = "#003f5c";
// ==========================================================

// ========= [ constant variables ] =========================
const title = '[ 위로 기계 ]';
const userNameInputPlaceholder = '사용자 이름을 입력해주세요';
const dummyVal = '제우스';
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
	}

	return (
		<SafeAreaView style={styles.wrap}>
			<View style={styles.container}>

				<Text style={styles.title}>{title}</Text>

				<KeyboardAvoidingView style={styles.inputView}>
					<Text style={styles.descriptionText}>
						{userNameInputPlaceholder}
					</Text>
					<TextInput
							style={styles.inputText}
							onChangeText={handleUserName}
							value={userName}
							placeholder={dummyVal}
						>
						</TextInput>
				</KeyboardAvoidingView>

				<View style={styles.buttonView}>
				<TouchableOpacity style={styles.button}
						onPress={onSetUserNameButtonClick}
						disabled={isUserNameEmpty}>
						<Text style={styles.buttonText}>{setUserNamebuttonText}</Text>	
					</TouchableOpacity>

					<TouchableOpacity style={styles.button}
						onPress={onSetExitButtonClick}>
						<Text style={styles.buttonText}>{exit}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
		
	);
};

export default User;


const styles = StyleSheet.create({
	wrap:{
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: backgroundColor,
		alignItems: 'center',
		justifyContent: 'center',
	  },
	title: {
		fontWeight:"bold",
		fontSize:50,
		color:TextColor,
		marginBottom:40
	  },

	inputView:{
		width:"80%",
		height:50,
		marginBottom:20,
		marginTop:40,
		justifyContent:"center",
	  },

	inputText:{
		backgroundColor: inputTextColor,
		borderRadius:25,
		fontWeight:"bold",
		height:50,
		fontSize:20,
		textAlign:"center",
		color:TextColor
	},
	descriptionText:{
		textAlign:"center",
		color:TextColor,
		fontSize:15,
		marginBottom:5
	},

	buttonView:{
		width:"80%",
		justifyContent:"center",
		marginTop:40,
	},
	button: {
		backgroundColor:buttonColor,
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:10
	  },
	buttonText:{
		fontWeight:"bold",
		color:"white",
		fontSize:20
	}
});