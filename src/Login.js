import React, { useState } from 'react';
import './Login.css';

function Login() {
	const [hasErrors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [loginFormVisible, setLoginVisibility] = useState(true);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function saveLogin(event) {
		setLoginVisibility(false);

		event.preventDefault();
	}

	function loginVisible(){
		setLoginVisibility(true);
	}

	return (
		<div className="login">
			<div className={`${loginFormVisible ? 'hidden' : ''}`}>
				<p className="currentuser">Current User: kkoppenhaver{username}</p>
				<button onClick={loginVisible}>Edit Login</button>
			</div>
			
			<form action="" onSubmit={saveLogin} className={`${loginFormVisible ? '' : 'hidden'}`}>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<label htmlFor="username">WordPress Username</label>
				<input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)}/>

				<label htmlFor="password">WordPress Password</label>
				<input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)}/>

				<input type="submit" value="Log In"/>
			</form>
		</div>
	);
}

export default Login;
