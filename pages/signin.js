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
	email: '',
	password: ''
};

const Signin = () => {
	const [signinInfo, setSigninInfo] = useState(initialState);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async e => {
		e.preventDefault();

		const { email, password } = signinInfo;

		if (!email || !password) {
			return;
		}

		try {
			const response = await axios.post(
				'https://iwallet-api.herokuapp.com/api/auth/signin',
				{ ...signinInfo }
			);

			cookies.set(null, 'token', response.data.token, { path: '/' });
			const { plannedRoute } = cookies.get();

			const parsedPlannedRoute = plannedRoute && JSON.parse(plannedRoute);

			const plannedHrefRoute = parsedPlannedRoute
				? parsedPlannedRoute.href
				: '/[country]';
			const plannedAsRoute = parsedPlannedRoute ? parsedPlannedRoute.as : '/us';

			router.replace(plannedHrefRoute, plannedAsRoute);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSigninInfo({
			...signinInfo,
			[name]: value
		});
	};

	return (
		<div className="signin">
			<form onSubmit={handleSubmit}>
				<CustomInput
					name="email"
					placeholder="Enter your email"
					value={signinInfo.email}
					onChange={handleInputChange}
					onBlur={validateEmail}
				></CustomInput>
				<CustomInput
					name="password"
					placeholder="Enter your password"
					type="password"
					value={signinInfo.password}
					onChange={handleInputChange}
					onBlur={validateRequired}
				></CustomInput>

				{error && <div className="error">{error}</div>}

				<Link href="/signup">
					<a>Create an account</a>
				</Link>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Signin;
