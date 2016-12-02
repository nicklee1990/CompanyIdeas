# Company Ideas Portal
A place for people to post their ideas for how the company can improve! Based on the excellent https://github.com/davezuko/react-redux-starter-kit.git

## Requirements
* node `^4.5.0`

## Getting Started

### Install from source

First, clone the project:

```bash
$ git clone git@github.com:nicklee1990/CompanyIdeas.git <project_name>
$ cd <project_name>
```

### Run the application (dev mode)

```bash
$ npm install    # Install project dependencies
$ npm dev        # Compile and launch with nodemon enabled
```

## Project Structure
The Company Ideas Portal is a React/Redux single page application based around Google's material design.

For the server side, it uses Express with a MongoDB database to store and update ideas. The frontend code is found in the src directory, with all server side code in the server directory

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   ├── controllers          # Route handlers
│   ├── models               # Mongoose models
│   ├── main.js              # Server application entry point
│   └── routes.js            # API routes
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Ideas            # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── assets       # Assets required to render components
│   │       ├── containers   # Reusable Container Components (For connecting to the Redux store)
│   │       ├── components   # Presentational React Components
│   │       ├── forms        # Redux-form components
│   │       └── routes **
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

## Scripts

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Technology
- [NodeJS](https://nodejs.org)
- [MongoDB](https://www.mongodb.com)

## Key Packages/Frameworks
* [react](https://github.com/facebook/react)
* [redux](https://github.com/reactjs/redux)
* [react-router](https://github.com/ReactTraining/react-router)
* [react-toolbox](http://react-toolbox.com)
* [redux-form](http://redux-form.com)
* [express](https://github.com/expressjs/express)
* [karma](https://github.com/karma-runner/karma)
* [socket.io](http://socket.io)

## Dev/Build Tools
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [SASS](http://sass-lang.com)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [eslint](http://eslint.org)

## Contributing
Please see the CONTRIBUTING.md file for contribution guidelines
