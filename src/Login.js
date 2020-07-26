import React, { useState, useEffect } from 'react';
import './Login.css';

import { ReactComponent as Chevron } from './svgs/chevron.svg';

function Login() {
	const [hasErrors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [loginFormVisible, setLoginVisibility] = useState(false);

	const [username, setUsername] = useState('');
	const [userAvatar, setUserAvatar] = useState('');
	const [api_key, setAPIKey] = useState( localStorage.getItem('temp-APIKEY') );
	const [api_secret, setAPISecret] = useState( localStorage.getItem('temp-APISECRET') );

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
				// Clear temp local storage
				localStorage.setItem('temp-APIKEY', '');
				localStorage.setItem('temp-APISECRET', '');

				setUsername(data.data.user.user_login);
				localStorage.setItem('username', data.data.user.user_login);

				const userID = data.data.user.id;
				var userUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/users/' + userID;

				fetch(userUrl)
				.then(response => response.json())
				.then(data => {
					var userAvatar = data.avatar_urls[48];

					setUserAvatar(userAvatar);
					localStorage.setItem('userAvatar', userAvatar);

					setUsername(data.name);
					localStorage.setItem('username', data.name);
				});

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

		window.location.reload(false);
	}

	function updateAPIKey(latestKey) {
		localStorage.setItem('temp-APIKEY', latestKey);
		setAPIKey(latestKey)
	}

	function updateAPISecret(latestSecret) {
		localStorage.setItem('temp-APISECRET', latestSecret);
		setAPISecret(latestSecret)
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

							const userID = data.data.user.id;
							var userUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/users/' + userID;

							fetch(userUrl)
							.then(response => response.json())
							.then(data => {
								var userAvatar = data.avatar_urls[48];

								setUserAvatar(userAvatar);
								localStorage.setItem('userAvatar', userAvatar);

								setUsername(data.name);
								localStorage.setItem('username', data.name);
							});

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
			<div className={`user ${username ? '' : 'hidden'}`}>
				<div className="user-avatar" style={{backgroundImage: `url('${userAvatar}')`}}></div>
				<p className="currentuser">{username}</p>

				<Chevron />

				<div className="submenu">
					<button className="logout" onClick={logOut}>Log Out</button>
				</div>
			</div>
			
			<button onClick={loginVisible} className={`${username ? 'hidden' : ''}`}>{username ? 'Login' : 'Log In'}</button>
			
			<form action="" onSubmit={saveLogin} className={`${loginFormVisible ? '' : 'hidden'}`}>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<label htmlFor="api_key">API Key</label>
				<input type="text" name="api_key" value={api_key} onChange={event => updateAPIKey(event.target.value)}/>

				<label htmlFor="api_secret">API Secret</label>
				<input type="text" name="api_secret" value={api_secret} onChange={event => updateAPISecret(event.target.value)}/>

				<input type="submit" value="Log In"/>
			</form>
		</div>
	);
}

export default Login;
