// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        userByID: (_, {id}, {dataSources}) => dataSources.userAPI.getUserByID({id}),
        inventory: (_, __, {dataSources}) => dataSources.storeAPI.getInventory(),
        orderByID: (_, {id}, {dataSources}) => dataSources.storeAPI.getOrderByID({id}),
        petByStatus: (_, {status}, {dataSources}) => dataSources.storeAPI.getPetsByStatus({status}),
        petByTags: (_, {tags}, {dataSources}) => dataSources.storeAPI.getPetsByTags({tags}),
        petByID: (_, {id}, {dataSources}) => dataSources.storeAPI.getPetByID({id})
    },
    Mutation: {
        login: (_, {username, password}, {dataSources}) => dataSources.userAPI.attemptLogin({username, password}),
        logout: (_, {id}, {dataSources}) => dataSources.userAPI.logout({id}),
        updateUser: (_, {user}, {dataSources}) => dataSources.userAPI.updateUser({user}),
        deleteUser: (_, {username}, {dataSources}) => dataSources.userAPI.deleteUser({username}),
        createUser: (_, {user}, {dataSources}) => dataSources.userAPI.createUser({user}),
        placeOrder: (_, {order}, {dataSources}) => dataSources.storeAPI.placeOrder({order}),
        removeOrder: (_, {id}, {dataSources}) => dataSources.storeAPI.removeOrder({id}),
        createPet: (_, {pet}, {dataSources}) => dataSources.storeAPI.createPet({pet}),
        updatePet: (_, {pet}, {dataSources}) => dataSources.storeAPI.updatePet({pet}),
        deletePet: (_, {id}, {dataSources}) => dataSources.storeAPI.deletePet({id}),
        updatePetStatus: (_, {id, name, status}, {dataSources}) => dataSources.storeAPI.updatePet({id, name, status})
    }
  };

module.exports = resolvers;

/* FOR MUTATIONS
login: (_, {username, password}, {dataSources}) => dataSources.userAPI.authenticate({username, password}),
logout: (_, {id}, {dataSources}) => dataSources.userAPI.logout({id}),
*/