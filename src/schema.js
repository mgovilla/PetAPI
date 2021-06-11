const { gql } = require('apollo-server');

// Establish Schema
const typeDefs = gql`
    type Pet {
        id: ID!
        name: String
        category: Category
        tags: [Tag]
        status: PetStatus
    }

    enum PetStatus {
        available
        pending
        sold
    }
    
    type Store {
        id: ID!
        name: String
        inventory: [Pet]
        orders: [Order]
    }
    
    type Order {
        id: ID!
        pet: Pet!
        quantity: Int
        shipDate: String
        status: OrderStatus
        complete: Boolean
    }

    enum OrderStatus {
        placed
        approved
        delivered
    }

    type Customer {
        id: ID!
        username: String
        address: Address
    }

    type Address {
        street: String
        city: String
        state: String
        zip: String
    }

    type Category {
        id: ID!
        name: String
    }
    
    type User {
        id: ID!
        username: String
        firstName: String
        lastName: String
        email: String
        password: String
        phone: String
        userStatus: Int
    }

    type Tag {
        id: ID!
        name: String
    }

    input TagInput {
        id: ID!
        name: String
    }

    input CategoryInput {
        id: ID!
        name: String
    }

    input PetInput {
        id: ID!
        name: String
        category: CategoryInput
        tags: [TagInput]
        status: PetStatus
    }

    input UserInput {
        id: ID!
        username: String
        firstName: String
        lastName: String
        email: String
        password: String
        phone: String
        userStatus: Int
    }

    input OrderInput {
        id: ID!
        pet: ID!
        quantity: Int
        shipDate: String
        status: OrderStatus
        complete: Boolean
    }

    type Query {
        userByID(id: ID!): User
        inventory: [Pet]
        orderByID(id: ID!): Order
        petByStatus(status: PetStatus!): [Pet]
        petByTags(tags: [TagInput]!): [Pet]
        petByID(id: ID!): Pet
    }

    type Mutation {
        login(username: String!, password: String!): User
        logout(id: ID!): String
        updateUser(user: UserInput!): User
        deleteUser(username: String!): String
        createUser(user: UserInput!): User
        placeOrder(order: OrderInput!): Order
        removeOrder(id: ID!): String
        createPet(pet: PetInput): Pet
        updatePet(pet: PetInput): Pet
        deletePet(id: ID!): String
        updatePetStatus(id: ID!, name: String, status: PetStatus): Pet
    }
`;

module.exports = typeDefs;