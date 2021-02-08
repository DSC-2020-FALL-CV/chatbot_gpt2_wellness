import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// ========= [ constant color ] =========================
const backgroundColor = '#003f5c';
// ======================================================

const styles = StyleSheet.create({
	name: {
		fontSize: 15,
		paddingBottom: 5,
	},
});

const Message = ({ isUser, name, message }) => {
	return (
		<View style={{ flexDirection: isUser ? 'row-reverse' : 'row' }}>
			<View
				style={{
					flexDirection: 'column',
					alignItems: isUser ? 'flex-end' : 'flex-start',
					paddingBottom: 20,
				}}
			>
				<Text style={styles.name}>{name}</Text>
				<View
					style={{
						maxWidth: 250,
						padding: 10,
						borderRadius: 5,
						backgroundColor: isUser
							? backgroundColor
							: 'whitesmoke',
					}}
				>
					<Text style={{ color: isUser ? 'white' : 'black' }}>
						{message}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Message;
