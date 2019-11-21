import Config from "@config/index"

export default {
  url: Config.db.mongoUrl,
  options: {
    useNewUrlParser: true
    // server: {
    //   poolSize: 5
    // },
    // replset: {
    //   rsName: 'myReplicaSetName'
    // },
    // auth: {
    //   authdb: 'project'
    // },
    // user: '',
    // pass: '',
    // roles: ['readWrite', 'dbAdmin']
  }
}