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

	function saveSite(event){
		if( siteURL[siteURL.length - 1] !== '/' ) {
			var slashedSiteURL = siteURL + '/';
		}
		else {
			slashedSiteURL = siteURL;
		}

		let url = `${slashedSiteURL}wp-json/`;

		// TO-DO: Make sure this is a valid URL and that an OAuth REST API response exists

		// Save the site URL to local storage
		localStorage.setItem('scratchpadSiteURL', url);

		// Fade out the component
		setSiteVisibility(false);

		event.preventDefault();
	}

	return (
		<div className={`site ${siteFormVisible ? '' : 'hidden'}`}>
			<form action="" onSubmit={saveSite}>
				<label htmlFor="siteURL">Site URL</label>
				<input type="url" name="siteURL" placeholder="https://example.com" value={siteURL} onChange={event => setURL(event.target.value)}/>

				<input type="submit" value="Save Site"/>
			</form>
		</div>
	);
}

export default Site;
