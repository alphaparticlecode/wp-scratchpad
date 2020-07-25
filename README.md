# WP Scratchpad
WP Scratchpad is a Chrome extension for quickly and easily creating draft posts on your WordPress site, no matter where you are on the web. It lives in your browser bar so that whenever inspirataion for a blog post strikes, you can quickly jot down the idea, provide any relevant links, save the post as a draft and get back to browsing. All in just a few clicks and _without_ having to log in to your WordPress site!

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

#### Downloading and activating the plugin
[zip from here](https://github.com/WP-API/jwt-auth/archive/develop.zip)

#### Generating and distributing key pairs for each author

#### Revoking key pairs

### Setting up WP Scratchpad

#### Downloading and activating the extension

#### Providing Site URL and JWT credentials

#### Drafting your first post

### Advanced Techniques

#### HTML as part of draft posts

#### Converting to blocks

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
