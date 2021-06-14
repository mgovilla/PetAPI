const { ApolloServer } = require('apollo-server');
const typeDefs = require('../src/schema');
const resolvers = require('../src/resolvers');

// Don't need to mock data for now otherwise this could change
const {UserAPI, StoreAPI} = require('../src/utils');

const CREATE_PET = 'mutation { createPet(pet: {name: "Caleb", id: 3, category: {id: 1, name: "Dog"}, tags: [], status: pending}) { name } }'

test('get inventory', async () => {
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
        storeAPI: new StoreAPI(),
        userAPI: new UserAPI()
        })
    });

    const res = await server.executeOperation({ query: "{ inventory { name } }" });
    expect(res.data).toEqual({inventory: [{name: 'Oliver'}, {name: 'James'}]})
    // expect(res).toMatchSnapshot();
});


test('mutation', async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
        storeAPI: new StoreAPI(),
        userAPI: new UserAPI()
        })
    });

    const res_mut = await server.executeOperation({ query: CREATE_PET });
    const res = await server.executeOperation({ query: "{ inventory { name } }" });
    expect(res.data).toEqual({inventory: [{name: 'Oliver'}, {name: 'James'}, {name: 'Caleb'}]})
});
