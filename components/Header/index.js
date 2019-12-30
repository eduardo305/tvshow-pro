import { useState } from 'react';
import { useRouter } from 'next/router';

const countries = [
	{
		label: 'us',
		name: 'United States'
	},
	{
		label: 'br',
		name: 'Brazil'
	}
];

const Header = () => {
	const router = useRouter();
	const [selectedCountry, setSelectedCountry] = useState(router.query.country);

	const handleChange = e => {
		setSelectedCountry(e.target.value);

		// /country
		router.push(`/[country]`, `/${e.target.value}`);
	};

	const renderCountries = () => {
		return countries.map(country => {
			return (
				<option key={country.label} value={country.label}>
					{country.name}
				</option>
			);
		});
	};

	return (
		<div className="header">
			<select value={selectedCountry} onChange={handleChange}>
				{renderCountries()}
			</select>

			<style jsx>{`
				.header {
					padding: 20px;
					background-color: #333;
					color: #fff;
					text-align: center;
					margin-bottom: 10px;
				}
			`}</style>
		</div>
	);
};

export default Header;
