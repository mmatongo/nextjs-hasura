import type { NextPage } from "next";
import Head from "next/head";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

import Todos from "../src/components/todos";
import CreateTodo from "../src/components/create";

const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
const API_URL = process.env.API_URL;

const link = new HttpLink({
  uri: API_URL,
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todos: {
            merge(_existing: any, incoming: any) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link,
});

const Home: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Head>
          <title>Todo App | Hasura | Apollo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-gray-100 border rounded-lg shadow-lg">
          <CreateTodo />
          <Todos />
        </main>

        <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
      </div>
    </ApolloProvider>
  );
};

export default Home;
