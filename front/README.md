# README

## Routing

Each **Feature** can define it's own routes inside it's `route.js` file.
Route files define the routes as JS objects, which are then later converted to ReactRouterV4 style on the Root component on renderRouteConfigV3 function.

Routes are also pre-processed on the routeConfig file that injecting index routes as required.

You can define as many child routes as you want, they will be properly injected as child routes.
To define a child route, just define it inside the child routes array. Give it a name and a path. If you add a prefixing slash (`/`) that route will be created as an additional root route. If you define the route as just `route-name` then it will be nested under it's parent feature route.

Login route is handled a bit specially. It is defined as any other route, but the main `App.js` component will redirect you to it if you are not logged in (according to redux state) and are not already on the login route. Login status is managed by `setupApp` action and the result is stored on redux

To create routes that loads it's resources async use the makeAsyncPage helper.Use it in place of the common route component a provide a function that calls `import('./component')`.