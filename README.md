# Create React Admin Amplify App

## Iteration 1 manual steps

- `npx create-react-app <name> <args>`
- ~~detect yarn here and use it~~ do this later
- `npm install react-admin`
- ~~detect `amplify cli` or `aws cli`~~
- ~~detect that `aws configure` has been run~~
- detect that `@aws-amplify/cli` is installed
- detect that `amplify configure` has been run [see](https://docs.amplify.aws/cli/start/install#option-1-watch-the-video-guide)
- `amplify init`
- `npm install @aws-amplify/core @aws-amplify/api @aws-amplify/auth`
- `npm install react-admin-amplify`
- `amplify add api`
- either run `amplify add codegen` or `amplify push` to generate graphql files
- copy over App.js

#### Notes

if not using AMAZON_COGNITO_USER_POOLS as amplify auth option, app.js boilerplate needs to change

## Before you start

**Double check you have installed**

- [node](https://nodejs.org/en/download/)
- `@aws-amplify/cli` from npm. Run `npm install -g @aws-amplify/cli`
or see the [official install page](https://docs.amplify.aws/cli/start/install)

## Demo

See the demo folder for a sample app.