'use strict'

const autocannon = require('autocannon')
const { ApolloServer } = require('apollo-server');
const typeDefs = require('../src/schema');
const resolvers = require('../src/resolvers');

// Don't need to mock data for now otherwise this could change
const {UserAPI, StoreAPI} = require('../src/utils');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
  storeAPI: new StoreAPI(),
  userAPI: new UserAPI()
  })
});

server.listen();

autocannon({
  url: 'http://localhost:4000',
  title: 'Load Test',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10,
  method: 'POST',
  headers: {'content-type' : 'application/json'},
  body: '{ "query": "{ inventory { name } }"}',
}, async (err, res) => { 
    console.log(res.statusCodeStats, res.errors);
    await server.stop();
  });


