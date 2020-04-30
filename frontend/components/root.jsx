import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppContainer from "./app_container";
import { ApolloProvider } from "react-apollo";
import { createClient } from "../util/apollo";

const Root = ({ store }) => (
  <Provider store={store}>
    <ApolloProvider client={createClient()}>
      <HashRouter>
        <AppContainer />
      </HashRouter>
    </ApolloProvider>
  </Provider>
);

export default Root;
