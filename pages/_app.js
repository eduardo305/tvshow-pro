import React from 'react';
import App from 'next/app';
import Header from '../components/Header';

class MyApp extends App {
	// Only uncomment this method if you have blocking data requirements for
	// every single page in your application. This disables the ability to
	// perform automatic static optimization, causing every page in your app to
	// be server-side rendered.
	//
	// static async getInitialProps(appContext) {
	//   // calls page's `getInitialProps` and fills `appProps.pageProps`
	//   const appProps = await App.getInitialProps(appContext);
	//
	//   return { ...appProps }
	// }

	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Header />
				<Component {...pageProps} />

				<style jsx>{`
					@font-face {
						font-family: 'raleway';
						src: url('/fonts/raleway/Raleway-Regular.ttf') format('truetype');
					}

					:global(html) {
						font-family: 'raleway';
					}

					:global(ul) {
						padding: 0;
						margin: 0;
						list-style-type: none;
					}

					:global(form) {
						display: flex;
						with: 100%;
						flex-direction: column;
						text-align: center;
					}

					:global(input) {
						margin-bottom: 10px;
						padding: 10px;
						width: 100%;
						box-sizing: border-box;
					}

					:global(button) {
						padding: 10px;
						margin-bottom: 10px;
						cursor: pointer;
						background-color: blue;
						color: #fff;
					}

					:global(.error) {
						color: red;
						padding-bottom: 10px;
					}
				`}</style>
			</>
		);
	}
}

export default MyApp;
