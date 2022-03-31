import "graphql-import-node";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as typeDefs from "../schema.graphql";
import resolvers from "./resolvers";
import { createContext } from "./context";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers,
});

app.use(
    "/",
    graphqlHTTP({
        context: createContext,
        schema,
        graphiql: true,
    })
);

app.listen({ port: 8080 }, () =>
    console.log("Server running at http://localhost:8080")
);
