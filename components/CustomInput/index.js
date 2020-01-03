import { useState } from 'react';

const CustomInput = ({
	name,
	placeholder = '',
	value,
	onChange,
	type = 'text',
	onBlur = () => {}
}) => {
	const [error, setError] = useState('');

	const handleBlur = () => {
		const isValid = onBlur && onBlur(value);
		isValid ? setError('') : setError(`Invalid ${name}`);
	};

	return (
		<div>
			<input
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={type}
				onBlur={handleBlur}
			/>
			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default CustomInput;
