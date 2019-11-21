import Config from "@config/index"

const endpoint = Config.graphql.url

const helloQuery = `{
  hello
}`

const basicQuery = [
  {
    endpoint,
    name: "Hello world",
    query: helloQuery
  }
]
export default basicQuery