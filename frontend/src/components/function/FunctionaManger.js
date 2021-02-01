import React from 'react';

export const checkIsStringEmpty = (str) => {
	if (!str || !str.trim()) return true;
	return false;
};
