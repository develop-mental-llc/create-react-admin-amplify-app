import { Amplify } from "@aws-amplify/core";
import React from "react";
import { Admin, Resource } from "react-admin";
import { buildAuthProvider, buildDataProvider } from "react-admin-amplify";
import awsExports from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

Amplify.configure(awsExports);

function App() {
  return (
    <Admin
      authProvider={buildAuthProvider({ authGroups: ["admin"] })}
      dataProvider={buildDataProvider({ queries, mutations })}
    >
      <Resource name="orders" />
    </Admin>
  );
}

export default App;
