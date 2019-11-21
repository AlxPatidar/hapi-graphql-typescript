import { merge } from "lodash"
import { makeExecutableSchema } from "graphql-tools"
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from "graphql-iso-date"

import { basicTypeDefs, basicResolvers } from "./basic"
import { todoTypeDefs, todoResolvers } from "./todos"
import { authTypeDefs, authResolvers } from "./auth"

// create schema and create combine schema
export const rootTypeDefs = [
  basicTypeDefs,
  todoTypeDefs,
  authTypeDefs
]
// create schema and create combine schema for fields
export const rootResolvers = merge(
  {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime
  },
  basicResolvers,
  todoResolvers,
  authResolvers
)

export default makeExecutableSchema({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers
})