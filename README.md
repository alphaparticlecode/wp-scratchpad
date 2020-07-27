# WP Scratchpad
WP Scratchpad is a Chrome extension for quickly and easily creating draft posts on your WordPress site, no matter where you are on the web. It lives in your browser bar so that whenever inspiration for a blog post strikes, you can quickly jot down the idea, provide any relevant links, save the post as a draft and get back to browsing. All in just a few clicks and _without_ having to log in to your WordPress site!

![WP Scratchpad in Action](https://github.com/alphaparticlecode/wp-scratchpad/blob/master/artwork/demo.jpg)

Since this is a browser extension that works inside _your_ browser, your post ideas and WordPress credentials never leave your hands and you can revoke the extension's access to WordPress at any time.

## Getting Started

For WP Scratchpad to work properly, you have to have a few things:
- [x] A publicly-accessible WordPress site (we don't support localhost, *.local, *.test, or sites behind a firewall right now)
- [x] The WordPress REST API endpoints accessible and not blocked by any security plugins or firewalls (the REST API ships as part of WP Core, so if you're unsure, you probably have it enabled)
- [x] HTTPS enabled (we want to make sure the connection between the Chrome extension and your WordPress site is secure)
- [ ] The latest version of the [JWT-Auth plugin](https://github.com/WP-API/jwt-auth/archive/develop.zip) installed and activated (don't worry if you don't have this yet, this is part of the instructions) 
- [ ] The latest version of WP Scratchpad downloaded from the Chrome Web Store and activated in your browser (we'll cover this in the instructions below as well.)

**If you'd rather watch instead of reading, check out the [Getting Started video](youtube.com) (<10 mins).**

### Setting up JWT Auth
This step only needs to be done once by the administrator of the site. Once the plugin is installed and activated, unique key pairs can be generated and distributed to each author that wants to use WP Scratchpad.

#### Downloading and activating the plugin
To start, you'll need the JWT Auth plugin installed on your WordPress site. [Download the ZIP version of the plugin from Github](https://github.com/WP-API/jwt-auth/archive/develop.zip) and upload it to your WordPress site by going to the *Plugins* menu, clicking on *Add New* and then *Upload Plugin*. From there you'll be able to select the ZIP file, confirm the upload and activate the plugin.

#### Generating and distributing key pairs for each author
Once the plugin is activated, you'll notice that on each user's profile in wp-admin there is a new section called *API Key-pairs*. This is where you can generate the API Key and API Secret that WP Scratchpad will use to make the connection to your WordPress site.

Where you see *New key-pair*, type *WP Scratchpad* for the name and click on *Add New*. You'll notice a pop up with your API Secret. **Once you dismiss this pop-up, you'll never be able to access the API Secret again.** So make sure you copy it down or, even easier, download the JSON file with both your API Key and API Secret. If you're going to be generating key pairs for multiple authors, downloading this JSON file for each author and sending it to them is the easiest way to get them up and running with their own copy of WP Scratchpad.

Repeat this process on each author's profile who you want to be able to use WP Scratchpad, making sure you send each author the unique keypair that you generated on their profile page. This will ensure they can use WP Scratchpad properly and that the drafts they create are attributed to them properly within WordPress.

#### Revoking key pairs
If for any reason you need to disable an author's access to post drafts through WP Scratchpad, you can go to their profile within wp-admin, find the key pair that you created for them and click on the *Revoke* button. This will immediately remove the ability for their copy of WP Scratchpad to post drafts into WordPress. If they try to create a new draft through WP Scratchpad, they will see the error message *"There was an error submitting your post. Please make sure your WordPress site is responding or try again later."*

### Setting up WP Scratchpad
Now that you've got the WordPress side configured and ready to go, you're ready to download the Chrome extension and start drafting posts!

#### Downloading and activating the extension
Open up the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) and search for *WP Scratchpad*. Once you find it in the search results (hopefully it's the #1 result!), click on *Add to Chrome* and in the resulting pop up click *Add extension*. Once the extension is added and activated, you should see the WP Scratchpad icon to the right of the URL bar. You can click on this icon at any time to bring up WP Scratchpad.

#### Providing Site URL and JWT credentials
The first time you download WP Scratchpad, you have to connect it to your site. First, enter the base URL of your site. If you're not sure what that is, you can look at the URL that's in the URL bar when you are logged into wp-admin and remove everything after and including */wp-admin/*. For example, if the URL of my WordPress admin area is https://loremipsum.com/wp-admin, the base URL for my site is https://loremipsum.com. Make sure to include the *https://* when you're typing in your URL. When you are done entering your URL, click *Save Site*.

Once your URL is entered, click on *Log In* and you will be prompted to enter your API Key and API Secret. These are the two values you got earlier when you were setting up WordPress. Copy and paste both of these values and click on *Log In* and WP Scratchpad should update with your username, letting you know you have logged in successfully. Remember that each author who you grant access to on the WordPress site has a different API Key and API Secret and should use their own to make sure drafts are properly attributed.

#### Drafting your first post
Now that you've saved the URL to your site and WP Scratchpad has made a successful connection to WordPress, you're ready to draft your first post! You should see inputs for the post title and post content. Input a post title (you can always change this later in WordPress) as well as the post content, including any notes or links you want to have saved. When you're ready, click *Post as Draft* and your title and content will be saved in WordPress as a draft post. Once your post is saved, you'll see the text *"Your post has been saved."* along with a link to *Edit in WordPress*. Clicking this link will take you directly into your new draft post in WordPress (or ask you to log in first) where you can make any additional edits.

Congratulations! You've just drafted your first post with WP Scratchpad!

### Advanced Techniques
Now that you've created your first post, read on to learn about some of the more advanced techniques you can use to get the most out of WP Scratchpad

#### HTML as part of draft posts
The *Post Content* field supports many HTML tags. So if you want to save a more comprenhensive outline of your post instead of just a couple sentences, you can use tags like `<h1>` or `<h2>`, which will be rendered correctly in either the Classic Editor or Gutenberg. Embeds such as Youtube and other embeds that WordPress supports will be handled correctly as well, if you inclulde them in *Post Content*.

#### Block Editor (Gutenberg) Support
If the block editor is active on your site, all of your post content that comes from WP Scratchpad will be contained within one Classic Editor block. You can either leave this block at the top of your post as a reminder while writing and delete it before you publish your post, or you can let the block editor convert it into blocks (see below).

#### Converting to blocks
If you have inserted some HTML and maybe an embed, your one Classic block that is inserted into your draft by default may be getting a little cluttered. If you select the 3 dots (⋮) menu for the Classic block, you'll see an option to *Convert to blocks*. The block editor will make best guesses about your content and try to split the content into it's respective blocks.

Let's say you have an `<h2>` tag with some content in it, then just a paragraph of notes about your draft, and then a Youtube link to remind yourself why you got the idea in the first place. *Convert to blocks* will convert your one Classic block into a Heading block, a Paragraph block, and a Youtube block, making your content more closely resemble a piece of content composed entirely in the block editor. For an example of this, check out the end of the [Getting Started video](https://youtube.com)

### Questions? Issues?
Send an email to [keanan@alphaparticle.com](mailto:keanan@alphaparticle.com) providing as much information as possible regarding the version of WordPress you are running, the version of Chrome you are running and what you did leading up to the issue.

-----------

# For Nerds ▼ ▼ ▼

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
