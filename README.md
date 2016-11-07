# Frontend/Client React stack

* Libraries
    * [react ^15](https://facebook.github.io/react/)
    * [redux](https://facebook.github.io/react/) **handling local app state**
    * [apollo](https://github.com/apollostack/apollo-client) **client GraphQL**
    * [fela](https://github.com/rofrischmann/fela) **best dynamic style library for Javascript**

Uses parts of this [boilerplate](https://github.com/iam4x/isomorphic-flux-boilerplate) mostly on
the server and webpack setup.

## Setup

  * Requirements
    * nodejs@4.4.3
    * npm@3 (`$ npm i -g npm`)

  * make sure you installed this server [graphQL server](https://github.com/talkhot/mock-dev-graphql) so we get data to load in our app.

## Run

  * make sure you started the server from [graphQL server](https://github.com/talkhot/mock-dev-graphql)

  * dev
    * `$ npm run dev` OR
    * `$ PORT=xxxx npm run dev`

  * build
    * `$ NODE_ENV=production npm run build`
    * `$ NODE_ENV=production node server`
