import React, { useState } from 'react';
import './Draft.css';

function Draft() {
	const [hasErrors, setErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [postTitle, setPostTitle] = useState('');
	const [postContent, setpostContent] = useState('');
	const [postLink, setpostLink] = useState('');

	if( localStorage.getItem('scratchpadJWT') && localStorage.getItem('scratchpadSiteURL') ) {
		var componentVisible = true;
	}
	else {
		componentVisible = false;
	}
	const [draftFormVisible] = useState(componentVisible);

	function stripScripts(s) {
	    var div = document.createElement('div');
	    div.innerHTML = s;
	    var scripts = div.getElementsByTagName('script');
	    var i = scripts.length;
	    while (i--) {
	      scripts[i].parentNode.removeChild(scripts[i]);
	    }
	    return div.innerHTML;
	};

	function savePostDraft(event){
		const requestOptions = {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('scratchpadJWT'), 
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: postTitle.trim(),
				content: stripScripts(postContent.trim()),
				status: 'draft'
			}),
			mode: 'cors',
			// TO-DO: Investigate why this is necessary to get it working from within the Chrome extension
			// It works without omitting the creds when running from https://localhost:3000 or similar
			credentials: 'omit'
		};

		var postUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/posts';

		fetch(postUrl, requestOptions)
			.then(response => response.json())
			.then(post => {
				console.log(post);
				if( post.id ) {
					setErrors(false);

					var adminUrl = localStorage.getItem('scratchpadSiteURL').replace('wp-json', 'wp-admin') + "post.php?post=" + post.id + "&action=edit";

					setpostLink(adminUrl);
					setPostTitle('');
					setpostContent('');

					setTimeout(function(){
						setpostLink('');
					}, 5000);
				}
				else {
					setErrorMessage('There was an error submitting your post. Please make sure your WordPress site is responding or try again later.');	

					setErrors(true);
				}
			});

		event.preventDefault();
	}

	return (
		<div className="draft">
			<form action="" onSubmit={savePostDraft} className={`${draftFormVisible ? '' : 'hidden'}`}>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<p className={`postLink ${postLink ? '' : 'hidden'}`}>Your post has been saved. <a href={postLink} rel="noopener noreferrer" target="_blank">Edit in WordPress</a></p>
				<input type="text" name="postTitle" value={postTitle} onChange={event => setPostTitle(event.target.value)} placeholder="Post Title"/>
				<textarea name="postContent" value={postContent} id="postContent" cols="30" rows="10" onChange={event => setpostContent(event.target.value)} placeholder="Post Content" />

				<input type="submit" value="Post as Draft"/>
			</form>
		</div>
	);
}

export default Draft;