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
	const [draftFormVisible, setDraftVisibility] = useState(componentVisible);

	function savePostDraft(event){
		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Authorization': 'Bearer ' + localStorage.getItem('scratchpadJWT'), 
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				title: postTitle.trim(),
				content: postContent.trim(),
				status: 'draft'
			}),
			mode: 'cors'
		};

		var postUrl = localStorage.getItem('scratchpadSiteURL') + 'wp/v2/posts';

		fetch(postUrl, requestOptions)
			.then(response => response.json())
			.then(post => {
				if( post.id ) {
					setErrors(false);

					var adminUrl = localStorage.getItem('scratchpadSiteURL').replace('wp-json', 'wp-admin') + "post.php?post=" + post.id + "&action=edit";

					setpostLink(adminUrl);
					setPostTitle('');
					setpostContent('');

					// Clear postLink after a 5 second timeout
				}
				else {
					setErrorMessage('There was an error submitting your post. Please make sure your WordPress site is responding or try again later.');	

					setErrors(true);
				}

				console.log(post);
			});

		event.preventDefault();
	}

	return (
		<div className="draft">
			<form action="" onSubmit={savePostDraft} className={`${draftFormVisible ? '' : 'hidden'}`}>
				<p className={`errors ${hasErrors ? '' : 'hidden'}`}>{errorMessage}</p>
				<p className={`postLink ${postLink ? '' : 'hidden'}`}>Your post has been saved. <a href={postLink} rel="noopener noreferrer" target="_blank">Edit in WordPress</a></p>
				<label htmlFor="postTitle">Post Title</label>
				<input type="text" name="postTitle" value={postTitle} onChange={event => setPostTitle(event.target.value)}/>

				<label htmlFor="postContent">Post Content</label>
				<textarea name="postContent" value={postContent} id="postContent" cols="30" rows="10" onChange={event => setpostContent(event.target.value)} />

				<input type="submit" value="Post as Draft"/>
			</form>
		</div>
	);
}

export default Draft;