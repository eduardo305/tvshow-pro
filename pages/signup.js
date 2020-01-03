import { useState } from 'react';
import axios from 'axios';
import cookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomInput from '../components/CustomInput';
import validateEmail from '../utils/validators/validateEmail';
import validateRequired from '../utils/validators/validateRequired';
// email
// password

const initialState = {
	name: '',
	email: '',
	password: ''
};

const Signup = () => {
	const [signupInfo, setSignupInfo] = useState(initialState);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async e => {
		e.preventDefault();

		const { email, password, name } = signupInfo;

		if (!email || !password || !name) {
			return;
		}

		try {
			const response = await axios.post(
				'https://iwallet-api.herokuapp.com/api/auth/signup',
				{ ...signupInfo }
			);

			cookies.set(null, 'token', response.data.token, { path: '/' });
			router.replace('/[country]', '/us');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSignupInfo({
			...signupInfo,
			[name]: value
		});
	};

	return (
		<div className="signin">
			<form onSubmit={handleSubmit}>
				<CustomInput
					name="name"
					placeholder="Enter your name"
					value={signupInfo.name}
					onChange={handleInputChange}
					onBlur={validateRequired}
				></CustomInput>

				<CustomInput
					name="email"
					placeholder="Enter your email"
					value={signupInfo.email}
					onChange={handleInputChange}
					onBlur={validateEmail}
				></CustomInput>
				<CustomInput
					name="password"
					placeholder="Enter your password"
					type="password"
					value={signupInfo.password}
					onChange={handleInputChange}
					onBlur={validateRequired}
				></CustomInput>

				{error && <div className="error">{error}</div>}

				<Link href="/signin">
					<a>Already have an account?</a>
				</Link>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Signup;
