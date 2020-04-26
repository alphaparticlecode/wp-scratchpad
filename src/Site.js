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
				setErrors(false);
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

		event.preventDefault();
	}

	function siteVisible() {
		setSiteVisibility( true );		
	}

	return (
		<div className="site">
			<div className={`${siteFormVisible ? 'hidden' : ''}`}>
				<p className="siteurl">Current URL: {siteURL}</p>
				<button onClick={siteVisible}>Edit Site</button>
			</div>
			
			<form action="" onSubmit={saveSite} className={`${siteFormVisible ? '' : 'hidden'}`}>
				<label htmlFor="siteURL">Site URL</label>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<input className={`${hasErrors ? 'error' : ''}`} type="url" name="siteURL" placeholder="https://example.com" value={siteURL} onChange={event => setURL(event.target.value)}/>

				<input type="submit" value="Save Site"/>
			</form>
		</div>
	);
}

export default Site;
