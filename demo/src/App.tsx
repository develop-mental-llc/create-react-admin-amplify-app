// in App.js
import { Amplify } from "@aws-amplify/core";
import React from "react";
import { Resource, Admin } from "react-admin";
import { buildDataProvider } from "react-admin-amplify";
import awsExports from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

import { PostList, PostEdit, PostCreate, PostIcon } from "./posts";

Amplify.configure(awsExports); // Configure Amplify the usual way

function App() {
  return (
    <Admin
      operations={buildDataProvider(
        { queries, mutations },
        { authMode: GRAPHQL_AUTH_MODE.API_KEY }
      )}
      dataProvider={buildDataProvider({ queries, mutations })}
      options={{ authGroups: ["admin"] }} // Pass the options
    >
      <Resource name="orders" />
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
    </Admin>
  );
}

export default App;
