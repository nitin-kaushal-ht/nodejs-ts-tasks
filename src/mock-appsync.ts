import { ApolloServer, gql } from "apollo-server";


const typeDefs = gql`
  type Query {
    fetchData: [Task]
  }

  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }
`;

const tasks = [
  { id: "1", title: "Mock Task 1", completed: false },
  { id: "2", title: "Mock Task 2", completed: true },
];

const resolvers = {
  Query: {
    fetchData: () => tasks,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Mock AppSync Server ready at ${url}`);
});
