import React, { useState } from 'react';
import './Site.css';

function Site() {
	var trimmedUrl = localStorage.getItem('scratchpadSiteURL') || '';

	if( '' !== trimmedUrl ) {
		trimmedUrl = trimmedUrl.split('/wp-json')[0];
		var componentVisible = false;
	}
	else {
		componentVisible = true;
	}

	const [siteURL, setURL] = useState(trimmedUrl);
  	const [siteFormVisible, setSiteVisibility] = useState(componentVisible);
  	const [hasErrors, setErrors] = useState(false);
  	const [errorMessage, setErrorMessage] = useState('');

	function saveSite(event){
		setErrors(false);
		event.preventDefault();

		if( ! siteURL.includes('https') ) {
			// Display error message that oauth must be enabled
			setErrorMessage('Site URLs are required to be HTTPS.');				

			setErrors(true);

			return;
		}

		if( siteURL[siteURL.length - 1] !== '/' ) {
			var slashedSiteURL = siteURL + '/';
		}
		else {
			slashedSiteURL = siteURL;
		}

		let url = `${slashedSiteURL}wp-json/`;

		fetch(url, { mode: 'cors' })
		  .then((response) => {
		    return response.json();
		  })
		  .then((data) => {
		    if( data.routes["/wp/v2/token"] ) {
				// Save the site URL to local storage
				localStorage.setItem('scratchpadSiteURL', url);

				// Fade out the component
				setSiteVisibility(false);
		    }
		    else {
				// Display error message that oauth must be enabled
				setErrorMessage('JWT routes not detected. Make sure the JWT plugin is installed and activated.');				

				setErrors(true);
		    }
		  })
		  .catch( err => {
		    // Display error message to that the URL must be for a WP site and have the REST API enabled
		    setErrorMessage('WP REST API not detected. Make sure the URL you provided is a WordPress site with the REST API enabled.');	

		    setErrors(true);
		  });
	}

	function siteVisible() {
		setSiteVisibility( true );		
	}

	return (
		<div className="site">
			<div className={`${siteFormVisible ? 'hidden' : ''}`}>
				<p className="siteurl">Site URL: {siteURL}</p>
				<svg style={{width: "24px", height: "24px"}} viewBox="0 0 24 24" onClick={siteVisible}>
				    <path fill="#7789A2" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
				</svg>
			</div>
			
			<form action="" onSubmit={saveSite} className={`${siteFormVisible ? '' : 'hidden'}`}>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<input className={`${hasErrors ? 'error' : ''}`} type="url" name="siteURL" placeholder="https://example.com" value={siteURL} onChange={event => setURL(event.target.value)}/>

				<input type="submit" value=""/>
			</form>
		</div>
	);
}

export default Site;
