export default {
  ops: {
    interval: 1000
  },
  reporters: {
    consoleReporter: [
      {
        module: "@hapi/good-squeeze",
        name: "Squeeze",
        args: [
          {
            error: "*",
            log: "*",
            response: "*",
            request: "*"
          }
        ]
      },
      {
        module: "@hapi/good-console"
      },
      "stdout"
    ]
  }
}