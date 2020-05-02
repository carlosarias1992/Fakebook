import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";

const setTokenForOperation = async (operation) =>
  operation.setContext({
    headers: {
      "X-CSRF-Token": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
    },
  });

const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      console.error("GraphQL - Error", {
        errors: graphQLErrors,
        operationName: operation.operationName,
        variables: operation.variables,
      });
    }

    if (networkError) {
      console.error("GraphQL - NetworkError", networkError);
    }
  });

export const createClient = () => {
  return new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      createUploadLink({
        uri: "/graphql",
        credentials: "include",
      }),
    ]),
    cache: new InMemoryCache(),
  });
};
