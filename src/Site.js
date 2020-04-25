import React from 'react';
import './Site.css';

function Site() {
  return (
	<div className="site">
		<label htmlFor="siteURL">Site URL</label>
		<input type="text" name="siteURL" placeholder="https://alphaparticle.com"/>

		<button>Save Site</button>
	</div>
  );
}

export default Site;
