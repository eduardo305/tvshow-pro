const validateEmail = value => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export default validateEmail;
