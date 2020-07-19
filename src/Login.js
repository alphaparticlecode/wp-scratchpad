import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
	const [hasErrors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [loginFormVisible, setLoginVisibility] = useState(false);

	const [username, setUsername] = useState('');
	const [api_key, setAPIKey] = useState('');
	const [api_secret, setAPISecret] = useState('');

	const [last_updated, setLastUpdated] = useState();

	useEffect(function(){
		validateOrRefreshJWT();
	}, []);

	function saveLogin(event) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				api_key: api_key,
				api_secret: api_secret
			}),
			mode: 'cors'
		};

		var tokenUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/token';

		fetch(tokenUrl, requestOptions)
		.then(response => response.json())
		.then(data => {
			if( data.data.status ) {
				setErrorMessage('Your credentials were invalid. Please double check your API key and API secret and try again.');	

				setErrors(true);
			}
			else {
				setUsername(data.data.user.user_login);
				localStorage.setItem('username', data.data.user.user_login);

				localStorage.setItem('scratchpadJWT', data.access_token);
				localStorage.setItem('scratchpadJWTRefresh', data.refresh_token);

				setLoginVisibility(false);

				window.location.reload(false);
			}
		});

		event.preventDefault();
	}

	function loginVisible(){
		setLoginVisibility(true);
	}

	function logOut(){
		localStorage.setItem('scratchpadJWT', '');
		localStorage.setItem('scratchpadJWTRefresh', '');
		localStorage.setItem('username', '');

		setLastUpdated(Date.now());

		window.location.reload(false);
	}

	function validateOrRefreshJWT() {
		if( localStorage.getItem('scratchpadJWT') ) {
			var validateUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/token/validate';

			const requestOptions = {
				headers: new Headers({
					'Authorization': 'Bearer ' + localStorage.getItem('scratchpadJWT'), 
				})
			}

			fetch(validateUrl, requestOptions)
			.then(response => response.json())
			.then(data => {
				if( data.code !== 'rest_authentication_valid_access_token' ){
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							refresh_token: localStorage.getItem('scratchpadJWTRefresh'),
						}),
						mode: 'cors'
					};

					var tokenUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/token';
					fetch(tokenUrl, requestOptions)
					.then(response => response.json())
					.then(data => {
						if( data.data.status ) {
							setErrorMessage('Your credentials were invalid. Please double check your API key and API secret and try again.');	

							setErrors(true);
						}
						else {
							setErrors(false);

							setUsername(data.data.user.user_login);
							localStorage.setItem('username', data.data.user.user_login);

							localStorage.setItem('scratchpadJWT', data.access_token);
							localStorage.setItem('scratchpadJWTRefresh', data.refresh_token);

							setLoginVisibility(false);
						}
					});
				}
				else {
					setUsername(localStorage.getItem('username'));
					setLoginVisibility(false);
				}
			});
		}
	}

	return (
		<div className="login">
			<div className={`${loginFormVisible ? 'hidden' : ''}`}>
				<p className="currentuser">Current User: {username ? username : 'Not Logged In'}</p>
				<button onClick={loginVisible}>{username ? 'Edit Login' : 'Log In'}</button>
				<button className={`logout ${username ? '' : 'hidden'}`} onClick={logOut}>Log Out</button>
			</div>
			
			<form action="" onSubmit={saveLogin} className={`${loginFormVisible ? '' : 'hidden'}`}>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<label htmlFor="api_key">API Key</label>
				<input type="text" name="api_key" value={api_key} onChange={event => setAPIKey(event.target.value)}/>

				<label htmlFor="api_secret">API Secret</label>
				<input type="text" name="api_secret" value={api_secret} onChange={event => setAPISecret(event.target.value)}/>

				<input type="submit" value="Log In"/>
			</form>
		</div>
	);
}

export default Login;
