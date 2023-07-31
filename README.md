# GraphQL Demo App

This app demonstrates some simple queries against the GitHub GraphQL API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Create a personal token and add it to a .env.local file to run this project. A .env-template file has been created in the /src folder to assist with this.

## Reflections and Future Improvements

Accessing the individual data of each node (repository name, URL etc.) took longer than expected because edges can have multiple types - not just Repository. The TypeScript error that was thrown didn't give many clues as to how it could be resolved. After some research I discovered an extra check for **edge.node.\_\_typename === 'Repository'** would fix the issue.

Simple pagination has been added. I was hoping to be able to add numbered pagination, e.g. Previous and Next buttons, with 1-10 in the middle, changing to 2-11, 3-12 as the pages change. However the GraphQL API doesn't appear to offer numbered offsets for search, which means that we have to use cursor based pagination and can't directly address a specific page.

Caching of the results could potentially be improved. Currently the code discards any existing results and only returns the incoming results from the API. It should be possible to return listings faster if we have already visited a page.

By default the search query is 'topic: react'. It would be nice to show that in the search bar, and provide helpful guidance to the user about which searches can be made.

This is not an exhaustive list of improvements. On an open-ended project such as this there will always be something which could be added. I hope that it at least shows an ability to make GraphQL queries and manipulate the data within a React and TypeScript project.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn codegen`

Generates types from the GitHub GraphQL API schema.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
